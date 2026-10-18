'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLang } from '@/lib/i18n'
import { Emoji } from './emoji'

type Article = { id: string; title: string; body: string; image?: string; createdAt: number }

const STORAGE_KEY = 'stellar-articles'

function resizeImage(file: File, maxSize = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export function ArticleBoard() {
  const { t, lang } = useLang()
  const [articles, setArticles] = useState<Article[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState<string | undefined>()
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setArticles(JSON.parse(saved))
    } catch {
      setArticles([])
    }
  }, [])

  const persist = (next: Article[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setArticles(next)
      return true
    } catch {
      setError(t({ zh: '本机存储空间已满，请删除旧文章或换一张更小的图片。', en: 'Local storage is full. Delete old posts or use a smaller image.' }))
      return false
    }
  }

  const onFile = async (file?: File) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError(t({ zh: '请选择图片文件。', en: 'Please choose an image file.' }))
      return
    }
    try {
      setImage(await resizeImage(file))
      setError('')
    } catch {
      setError(t({ zh: '图片读取失败，请换一张试试。', en: 'Could not read that image. Try another one.' }))
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setError(t({ zh: '请填写标题和正文。', en: 'Please add a title and some text.' }))
      return
    }
    const article: Article = { id: crypto.randomUUID(), title: title.trim(), body: body.trim(), image, createdAt: Date.now() }
    if (persist([article, ...articles])) {
      setTitle('')
      setBody('')
      setImage(undefined)
      setError('')
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const remove = (id: string) => {
    if (window.confirm(t({ zh: '确定删除这篇文章吗？', en: 'Delete this post?' }))) persist(articles.filter((a) => a.id !== id))
  }

  return (
    <section className="section" id="articles">
      <div className="wrap">
        <p className="eyebrow">Stargazer Notes</p>
        <h2 className="section-title">{t({ zh: '观星笔记', en: 'Stargazer Notes' })}</h2>
        <p className="lead" style={{ marginBottom: 28 }}>
          {t({ zh: '写下你的观测记录、科普心得或天文照片，与星空对话。', en: 'Share your observations, thoughts, or astrophotos.' })}
        </p>

        <div className="article-layout">
          <form className="glass form-card" onSubmit={onSubmit}>
            <h3 className="form-title">
              <Emoji name="memo" className="emoji" />
              {t({ zh: '发表文章', en: 'New Post' })}
            </h3>
            <div className="field">
              <label htmlFor="article-title">{t({ zh: '标题', en: 'Title' })}</label>
              <input id="article-title" className="input" maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t({ zh: '例如：今晚看到了木星', en: 'e.g. I saw Jupiter tonight' })} />
            </div>
            <div className="field">
              <label htmlFor="article-body">{t({ zh: '正文', en: 'Text' })}</label>
              <textarea id="article-body" className="textarea" maxLength={3000} value={body} onChange={(e) => setBody(e.target.value)} placeholder={t({ zh: '写点什么吧……', en: 'Write something…' })} />
            </div>
            <div className="field">
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{t({ zh: '配图（可选）', en: 'Image (optional)' })}</span>
              {image ? (
                <div className="upload-preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={t({ zh: '配图预览', en: 'Image preview' })} />
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setImage(undefined); if (fileRef.current) fileRef.current.value = '' }}>
                    {t({ zh: '移除', en: 'Remove' })}
                  </button>
                </div>
              ) : (
                <label className="upload">
                  <Emoji name="telescope" className="emoji" />
                  <span>{t({ zh: '点击上传图片', en: 'Click to upload an image' })}</span>
                  <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
                </label>
              )}
            </div>
            <p className="error" role="alert">{error}</p>
            <div className="form-foot">
              <span className="note">{t({ zh: '仅保存在本机浏览器', en: 'Saved in this browser only' })}</span>
              <button type="submit" className="btn btn-primary">{t({ zh: '发布', en: 'Publish' })}</button>
            </div>
          </form>

          <div className="article-list">
            {articles.length === 0 ? (
              <div className="glass empty">{t({ zh: '还没有文章，来写第一篇吧。', en: 'No posts yet — be the first to write one.' })}</div>
            ) : (
              articles.map((a) => (
                <article key={a.id} className="glass article">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {a.image && <img src={a.image} alt={a.title} />}
                  <div className="article-body">
                    <div className="article-meta">
                      <time dateTime={new Date(a.createdAt).toISOString()}>
                        {new Date(a.createdAt).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                      </time>
                      <button type="button" className="link-btn" onClick={() => remove(a.id)}>
                        {t({ zh: '删除', en: 'Delete' })}
                      </button>
                    </div>
                    <h3 className="article-title">{a.title}</h3>
                    <p className="article-text">{a.body}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

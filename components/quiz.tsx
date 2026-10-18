'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useLang } from '@/lib/i18n'
import { QUESTIONS, QUIZ_ROUND, type Question } from '@/lib/data'

type Entry = { name: string; score: number; total: number; date: number }
type Phase = 'start' | 'play' | 'done'

const BOARD_KEY = 'stellar-leaderboard'
const KEYS = ['A', 'B', 'C', 'D']

function pickQuestions(): Question[] {
  return [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, QUIZ_ROUND)
}

export function Quiz() {
  const { t } = useLang()
  const [phase, setPhase] = useState<Phase>('start')
  const [name, setName] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [board, setBoard] = useState<Entry[]>([])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(BOARD_KEY)
      if (saved) setBoard(JSON.parse(saved))
    } catch {
      setBoard([])
    }
  }, [])

  const start = (e?: FormEvent) => {
    e?.preventDefault()
    setQuestions(pickQuestions())
    setIndex(0)
    setAnswers([])
    setPhase('play')
  }

  const current = questions[index]
  const picked = answers[index]
  const answered = picked !== undefined
  const score = answers.filter((a, i) => questions[i] && a === questions[i].answer).length

  const choose = (option: number) => {
    if (answered) return
    const next = [...answers]
    next[index] = option
    setAnswers(next)
  }

  const finish = () => {
    const entry: Entry = { name: name.trim() || t({ zh: '匿名观星者', en: 'Anonymous' }), score, total: questions.length, date: Date.now() }
    const next = [...board, entry].sort((a, b) => b.score - a.score || a.date - b.date).slice(0, 10)
    setBoard(next)
    try {
      window.localStorage.setItem(BOARD_KEY, JSON.stringify(next))
    } catch {}
    setPhase('done')
  }

  const goNext = () => (index + 1 < questions.length ? setIndex(index + 1) : finish())

  const clearBoard = () => {
    if (!window.confirm(t({ zh: '确定清空排行榜吗？', en: 'Clear the leaderboard?' }))) return
    setBoard([])
    window.localStorage.removeItem(BOARD_KEY)
  }

  return (
    <div className="wrap quiz-grid">
      <section className="glass panel" aria-live="polite">
        {phase === 'start' && (
          <form onSubmit={start}>
            <h2 className="card-title">{t({ zh: '准备好了吗？', en: 'Ready?' })}</h2>
            <p className="lead" style={{ marginBottom: 20 }}>
              {t({ zh: `每轮随机 ${QUIZ_ROUND} 道题，答完后可以看到解析并登上排行榜。`, en: `Each round has ${QUIZ_ROUND} random questions. See explanations and join the leaderboard when you finish.` })}
            </p>
            <div className="field">
              <label htmlFor="quiz-name">{t({ zh: '你的昵称', en: 'Your nickname' })}</label>
              <input id="quiz-name" className="input" maxLength={20} value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ zh: '例如：小小天文学家', en: 'e.g. Star Hunter' })} />
            </div>
            <button type="submit" className="btn btn-primary">{t({ zh: '开始答题', en: 'Start Quiz' })}</button>
          </form>
        )}

        {phase === 'play' && current && (
          <div>
            <div className="quiz-meta">
              <span>{t({ zh: '第', en: 'Question ' })}{index + 1} / {questions.length}{t({ zh: ' 题', en: '' })}</span>
              <span>{t({ zh: '得分', en: 'Score' })}: {score}</span>
            </div>
            <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={index + (answered ? 1 : 0)}>
              <div className="progress-bar" style={{ width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
            </div>
            <h2 className="question">{t(current.q)}</h2>
            <div className="options">
              {current.options.map((opt, i) => {
                const state = answered ? (i === current.answer ? ' is-correct' : i === picked ? ' is-wrong' : '') : ''
                return (
                  <button key={i} type="button" className={`option${state}`} disabled={answered} onClick={() => choose(i)}>
                    <span className="option-key">{KEYS[i]}</span>
                    {t(opt)}
                  </button>
                )
              })}
            </div>
            {answered && (
              <>
                <p className="explain">
                  <strong>{picked === current.answer ? t({ zh: '回答正确！', en: 'Correct! ' }) : t({ zh: '答错了。', en: 'Not quite. ' })}</strong>
                  {t(current.explain)}
                </p>
                <div className="actions">
                  <button type="button" className="btn btn-primary" onClick={goNext}>
                    {index + 1 < questions.length ? t({ zh: '下一题', en: 'Next' }) : t({ zh: '查看成绩', en: 'See Results' })} →
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {phase === 'done' && (
          <div>
            <h2 className="card-title">{t({ zh: '本轮成绩', en: 'Your Score' })}</h2>
            <p className="score">{score}<small>/ {questions.length}</small></p>
            <p className="lead" style={{ marginTop: 10 }}>
              {score === questions.length
                ? t({ zh: '满分！你是真正的星空达人。', en: 'Perfect! You are a true stargazer.' })
                : score >= questions.length * 0.7
                  ? t({ zh: '很棒！再来一轮冲击满分吧。', en: 'Great job! Go for a perfect score.' })
                  : t({ zh: '继续探索科普栏目，再来挑战吧。', en: 'Explore the topics and try again.' })}
            </p>
            <ul className="review">
              {questions.map((q, i) => (
                <li key={i} className={answers[i] === q.answer ? 'ok' : 'no'}>
                  {i + 1}. {t(q.q)}
                  <p className="muted">{t({ zh: '正确答案：', en: 'Answer: ' })}{t(q.options[q.answer])}</p>
                </li>
              ))}
            </ul>
            <div className="actions">
              <button type="button" className="btn btn-primary" onClick={() => start()}>{t({ zh: '再来一轮', en: 'Play Again' })}</button>
              <button type="button" className="btn btn-ghost" onClick={() => setPhase('start')}>{t({ zh: '换个昵称', en: 'Change Name' })}</button>
            </div>
          </div>
        )}
      </section>

      <aside className="glass panel" aria-label={t({ zh: '排行榜', en: 'Leaderboard' })}>
        <div className="board-head">
          <h2 className="card-title">{t({ zh: '排行榜', en: 'Leaderboard' })}</h2>
          {board.length > 0 && (
            <button type="button" className="link-btn" onClick={clearBoard}>{t({ zh: '清空', en: 'Clear' })}</button>
          )}
        </div>
        {board.length === 0 ? (
          <p className="empty" style={{ padding: '20px 0' }}>{t({ zh: '还没有记录，快来成为第一名！', en: 'No scores yet — be the first!' })}</p>
        ) : (
          <ol className="board">
            {board.map((entry, i) => (
              <li key={`${entry.date}-${i}`}>
                <span className="rank">{i + 1}</span>
                <span>{entry.name}</span>
                <span className="pts">{entry.score}/{entry.total}</span>
              </li>
            ))}
          </ol>
        )}
      </aside>
    </div>
  )
}

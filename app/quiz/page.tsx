import type { Metadata } from 'next'
import { QuizView } from '@/components/quiz-view'

export const metadata: Metadata = { title: '问答 Quiz · 星谱' }

export default function QuizPage() {
  return <QuizView />
}

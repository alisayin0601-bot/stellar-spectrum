import { QuizView } from '@/components/quiz-view'
import { useDocumentTitle } from '../use-document-title'

export function QuizPage() {
  useDocumentTitle('问答 Quiz · 星谱')
  return <QuizView />
}

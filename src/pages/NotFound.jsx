import { ArrowLeft } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <PageHero eyebrow="Page not found" title="This road does not go anywhere" text="The page you were looking for has moved or does not exist.">
      <Button href="/" iconLeft={ArrowLeft}>Back to home</Button>
    </PageHero>
  )
}

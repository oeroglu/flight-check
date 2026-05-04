import { redirect } from 'next/navigation'

// Kök path'i routes'a yönlendir
export default function HomePage() {
  redirect('/routes')
}

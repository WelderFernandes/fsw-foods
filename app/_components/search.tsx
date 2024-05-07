'use client'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEventHandler, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Search() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }
  const handleChangeSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!search) return
    router.push(`/restaurants?search=${search}`)
  }
  return (
    <form className="flex gap-4" onClick={handleChangeSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none bg-zinc-200"
        onChange={handleChange}
        value={search}
      />
      <Button size="icon" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  )
}

import { FC, MouseEvent } from 'react'
import Image from 'next/image'

export const LikeButton: FC<{
  isLiked?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}> = ({ isLiked, onClick }) => {
  return (
    <button onClick={onClick} className="w-5 h-5">
      <Image
        src={isLiked ? '/like-after.svg' : '/like-before.svg'}
        width={20}
        height={20}
        alt="Like button"
      />
    </button>
  )
}

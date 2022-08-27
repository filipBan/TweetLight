import { FC } from 'react'
import Image from 'next/image'

export const LikeButton: FC<{ isLiked?: boolean; onClick?: () => void }> = ({
  isLiked,
  onClick,
}) => {
  return (
    <button onClick={onClick}>
      <Image
        src={isLiked ? '/like-after.svg' : '/like-before.svg'}
        width={20}
        height={20}
        alt="Like button"
      />
    </button>
  )
}

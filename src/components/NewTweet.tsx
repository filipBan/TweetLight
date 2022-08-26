import { useState } from 'react'

export const NewTweet = () => {
  const [value, setValue] = useState('')
  return (
    <div className="mb-4 flex flex-col items-end">
      <div className="border h-32 w-full mb-2">
        <textarea
          className="w-full h-full bg-inherit p-2 outline-none"
          placeholder="What's up?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        onClick={() => console.log(value)}
        className="border outline-none cursor-pointer h-10 w-24"
      >
        Send
      </button>
    </div>
  )
}

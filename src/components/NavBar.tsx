import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export const NavBar = () => {
  const { data: session } = useSession()

  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="flex justify-center bg-slate-600 h-14">
      <div className="flex justify-between items-center w-full md:w-3/5 relative">
        <div>TweetLight</div>
        <div className="h-full w-40">
          <button
            className="w-full h-full text-end pr-2 hover:bg-slate-700"
            onClick={() => setShowMenu((v) => !v)}
          >
            Hi, {session?.user?.name?.split(' ')[0]}
          </button>
          {showMenu && (
            <ul className="absolute top-14 right-0 bg-slate-600 w-40 text-end border border-t-0">
              <li className="h-8 hover:bg-slate-700">
                <button
                  className="w-full h-full text-end pr-2"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

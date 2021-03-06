import Head from 'next/head'
import GameScore from '../components/GameScore.js'
import { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { Auth } from '@supabase/ui'
import { supabase } from "../utils/supabaseClient.js"

export default function Home() {
  // gets the logged in user from Auth.UserContextProvider
  // if no user is logged in, user will be null
  // if a user is logged in, user will be an object with user info
  const { user } = Auth.useUser()

  return (
    <div className="flex grow font-mono items-center justify-center bg-white min-h-screen min-w-screen">
      <Head>
        <title>NHL Stats</title>
        <link rel="icon" href="/sticks.ico" />
      </Head>
      
      <main>
        {
          // display app if user is logged in, otherwise show login module
          user ? (
            <div>
              {/* displays the GameScore Tableau */}
              {/* attempted to do all of the separate pages here in lieu of having links in the header */}
              {/* instead the buttons in the header would hide everything except the desired page */}
              {/* did not work as I couldn't easily pass in the user variables and it was difficult to figure out the functionality of hiding all that */}
              {/* also tried to just have all of the pages in here scrolling with the header fixed up top but the header would overlap there and wouldn't justify between correctly */}
              <GameScore user={user} />
            </div>
          ) : (
            // log-on page
            <div className="flex flex-col p-5 justify-center items-center text-center object-center text-4xl font-semibold">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/05_NHL_Shield.svg/800px-05_NHL_Shield.svg.png" alt="The NHL logo" className="object-center items-center justify-center w-1/3 h-1/3"></img>
              <p1>Benjamin Kahn's NHL Analytics</p1>
              <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge"/>
            </div> 
          )       
        }
      </main>
    </div>
  )
}

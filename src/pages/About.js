import {React} from 'react';
import logo from '../assets/coda.png';


export default function About() {
    return (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 text-black p-8 space-y-6">
            <h1 className="text-4xl font-bold">
                Connecting the campus, one "pull up" at a time!
            </h1>

        <h2 className="text-2xl font-bold mb-2">What is Capy?</h2>
        <p>
          Capy is a not-for-profit project developed by a team of UCLA students to reduce loneliness on campus and connect students through fun events and activities.
        </p>
        <h2 className="text-2xl font-bold mb-2">What does Capy and pulling up mean?</h2>
        <p>
          Capy is from the meme (online joke) of a capybara in a car with a famous Don Toliver song "After Party." Pulling up means to go, which is in the song.
        </p>
        <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
        <p className="text-lg">
          Our mission is to reduce loneliness at UCLA pushing others to seek discomfort by connecting with others on campus one "pull up" at a time.
        </p>

        <h2 className="text-2xl font-bold mb-2">What can I do with Capy?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-sm text-gray-700">
            Connect with your classmates by "pulling up" to fun events in the area!
          </li>
          <li className="text-sm text-gray-700">
            Make friends and build your own community by sending friend requests to other users you meet!
          </li>
          <li className="text-sm text-gray-700">
            Create new events and get the community involved with fun activities you're planning!
          </li>
        </ul>
      </div>

      <div className="md:w-1/3 flex items-center justify-center p-8">
        <img src={logo} alt="Codas" className="rounded-full w-full" style={{ maxWidth: '600px' }} />
    </div>
            {/* <p>
                Our mission is to reduce loneliness at UCLA, and connect the campus one "pull up" at a time!
            </p>
            <p>
                We are a team of UCLA students that are working on developing this not-for-profit project
            </p>
            <p>
                Here's what you can do using Capy!
            </p>
            <ul class="list-disc pl-5 space-y-2">
              <li class="text-sm text-gray-700"> 
                Connect with your classmates by "pulling up" to fun events in the area!
              </li>
              <li class="text-sm text-gray-700">
                Make friends and build your own community by sending friend requests to other users you meet!
              </li>
              <li class="text-sm text-gray-700">
                Create new events and get the community involved with fun activities you're planning!
              </li>
            </ul>
          </div>
          <div className="md:w-1/3 flex items-center justify-center p-8">
            <img src={logo} alt="Codas" className="rounded-full w-full" style={{ maxWidth: '600px' }}/>
          </div> */}
        </div>
      );
}
import {React} from 'react';

export default function About() {
    return (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 text-black p-8 space-y-6">
            <h1 className="text-4xl font-bold">
                Connecting the campus, one "pull up" at a time!
            </h1>
            <p>
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
            <img src="../assets/coda.png" alt="Codas" className="rounded-full w-full" style={{ maxWidth: '600px' }}/>
          </div>
        </div>
      );
}
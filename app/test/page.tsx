"use client"

import React, { useCallback, useState } from "react";
import { uploadThumbnail, getDownloadLink } from "@/configurations/firebase/config";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/configurations/redux/features/todos/counter'
import { RootState } from '@/configurations/redux/store';
const App = () => {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch()
  const upload = useCallback(async () => {
    const result = await uploadThumbnail(thumbnailFile);
    const path = result.ref.fullPath
    const link = getDownloadLink(path)
    console.log(link);
  }, [thumbnailFile]);


  const handlethumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setThumbnailFile(file);
  };

  return (
    <div>
      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full p-3">
            <div className="relative h-48 rounded-lg border-dashed border-2 border-orange-600 flex justify-center items-center">
              <div className="absolute">
                <div className="flex flex-col items-center">
                  <i className="fa fa-folder-open fa-4x text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="90px" viewBox="0 0 24 24" width="90px" fill="#fc6203"><g><rect fill="none" height="24" width="24" /></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z" /></g></svg>
                  </i>
                  <span className="block text-gray-400 font-normal">Upload video thumbnail</span>
                </div>
              </div>
              <input
                type="file"
                className="h-full w-full opacity-0"
                name=""
                onChange={handlethumbnailFileChange}
              />
            </div>
          </div>
          <button onClick={upload}>Submit</button>
          <div>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <span>{count}</span>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;

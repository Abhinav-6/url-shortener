import { useRef, useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const inputRef = useRef(null);

  async function submitHandler(e) {
    e.preventDefault();
    if (inputRef.current.value === null) return;
    if (inputRef.current.value.trim() === "") return;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalURL: inputRef.current.value })
  };
    const response = await fetch("http://localhost:3001/short", requestOptions);
    const data = await response.json();
    setUrl(data.url);
    inputRef.current.value = "";
    console.log(data);
  }
  return (
    <>
      <nav className="flex bg-white p-4 gap-2 md:gap-4">
        <img src="/vite.svg" alt="logo" />
        <h2 className="text-2xl">URL Shortener</h2>
      </nav>
      <h1 className="text-3xl ffont-bold m-auto mt-4 text-center ">
        Short your lengthy boring URL.
      </h1>
      <form className="flex mx-auto my-4 flex-col justify-center bg-gray-100 rounded-md max-w-xl p-4">
        <div className="flex gap-2 justify-center items-center m-2">
          <label htmlFor="inputUrl" className="text-xl">
            Original URL :{" "}
          </label>
          <input
            type="text"
            ref={inputRef}
            id="inputUrl"
            className="bg-white rounded-md w-xl p-2"
          />
        </div>
        <button
          onClick={submitHandler}
          type="submit"
          className="p-2 bg-purple-500 w-full rounded-md max-w-[15rem] mx-auto mt-4 text-white"
        >
          Short
        </button>
      </form>
      {url && (
        <div className="flex justify-center gap-2">
          <p>Short Url : </p>
          <a href={url} target="_blank" className="text-blue-600 underline animate-pulse">{url}</a>
        </div>
      )}
    </>
  );
}

export default App;

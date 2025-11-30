import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../../store (3)/api/postApi";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const imgRef = useRef(null);

  const { creatPostLoading, error } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(text);
    dispatch(createPost({ text: text, image: img }));
    setText("");
    setImg(null);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`flex overflow-auto items-start gap-4 border-b border-gray-800 p-4`}
    >
      <div className="avatar px-2">
        <div className="w-8 rounded-full">
          <img src={userData?.profilePic || "/avatar-placeholder.png"} />
        </div>
      </div>
      <form
        className="flex flex-col gap-2 w-full relative"
        onSubmit={handleSubmit}
      >
        <textarea
          className="textarea w-full p-2 text-xl resize-none border-none focus:outline-none bg-transparent text-white placeholder-gray-500 min-h-[100px]"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {img && (
          <div className="relative ">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            />
            <img
              src={img}
              className="w-full mx-auto h-72 object-contain rounded inline-block"
            />
          </div>
        )}

        <div className="flex justify-between items-center border-t border-gray-800 pt-3 mt-2">
          <div className="flex gap-4 items-center">
            <CiImageOn
              className="text-blue-500 w-6 h-6 cursor-pointer hover:bg-blue-500/10 rounded-full transition-colors"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmileFill className="text-blue-500 w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
          </div>
          <input type="file" hidden ref={imgRef} onChange={handleImgChange} />
          <button className="btn bg-blue-500 hover:bg-blue-600 border-none rounded-full btn-sm text-white px-6 font-bold disabled:opacity-50 disabled:cursor-not-allowed" disabled={!text && !img}>
            {creatPostLoading ? "Posting..." : "Post"}
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};
export default CreatePost;

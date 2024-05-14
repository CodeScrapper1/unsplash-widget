import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

const Images = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [lastTrigger, setLastTrigger] = useState(0);

  useEffect(() => {
    searchPhotos();
  }, []);
  const searchPhotos = async () => {
    setLoading(true);
    setPhotos([]);
    await loadMoreImages();
    setLoading(false);
  };

  const loadMoreImages = async () => {
    setLoading(true);
    const newPhotos = [];
    for (let i = 0; i < 10; i++) {
      const uniqueURL = `https://source.unsplash.com/random/?${
        keyword || "nature"
      }`;
      try {
        const res = await fetch(uniqueURL);
        const finalURL = res.url;
        newPhotos.push({ url: finalURL, alt: `Image ${i + 1}` });
      } catch (error) {
        console.log("error fetching images", error);
      }
      setPhotos((pre) => [...pre, ...newPhotos]);
      setLoading(false);
    }
  };

  // on scroll
  const handleScroll = (e) => {
    const scrollY = e.target.scrollTop;
    const currentMultiple = Math.floor(scrollY / 1550);
    if (currentMultiple > lastTrigger && !loading) {
      loadMoreImages();
      setLastTrigger(currentMultiple);
    }
    console.log(currentMultiple, "scrollY");
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      searchPhotos();
    }
  };

  const downloadImage = async (imageURL) => {
    const res = await fetch(imageURL);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.setAttribute("download", "image.jpg");
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };
  console.log(photos, "photos");
  return (
    <div className="widget-main-popup">
      <input
        type="text"
        name=""
        id="searchInput"
        placeholder="Search something here ..."
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      {loading && <div>Loading ...</div>}
      <div className="photoContainer" onScroll={handleScroll}>
        {photos?.map((photo, index) => (
          <div key={index} className="photo-box">
            <img src={photo.url} alt={photo.alt} />
            <button
              className="photo-download-btn"
              onClick={() => downloadImage(photo.url)}
            >
              <FaDownload />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;

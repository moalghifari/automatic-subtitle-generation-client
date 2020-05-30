import axios from 'axios';
const defaultAPIURL = process.env.REACT_APP_API_URL

// Deny the code validations status, so 4** and 5** responses can still be resolved
const validateStatus = () => true;

/**
 * Upload news video
 * @param {video} news_video
 */
const postNewsVideo = news_video =>
  new Promise(async (resolve, reject) => {
    try {
      const data = new FormData();
      data.append('file', news_video);
      const url = `${defaultAPIURL}/news-videos`;
      const { data: response } = await axios({
        url,
        method: 'POST',
        data,
        validateStatus
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export default postNewsVideo;
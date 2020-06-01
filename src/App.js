import React from 'react';
import { useState, useEffect} from 'react';
import {
  Card,
  Form,
  FormGroup,
  Button,
  Col,
  Row,
  CustomInput
} from 'reactstrap';
import { postNewsVideo, getTranscription } from './news_video';
import Swal from 'sweetalert2';

const App = () => {
  const [newsVideo, setNewsVideo] = useState(undefined);
  const [newsVideoFilename, setNewsVideoFilename] = useState(undefined);
  const [transcription, setTranscription] = useState(``)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newsVideoError, setNewsVideoError] = useState(undefined);
  const [newsVideoErrorFilename, setNewsVideoFilenameError] = useState(undefined);
  const [transcriptionError, setTranscriptionError] = useState(undefined);

  const errorSetters = {
    newsVideo: setNewsVideoError,
    transcription: setTranscriptionError
  }

  const onFileChange = async (newsVideo) => {
    try {
      setNewsVideo(newsVideo);
    } catch (e) {
      setLoading(false);
      setError('Could not upload file');
    }
  };

  const uploadNewsVideo = async () => {
    try {
      setLoading(true);
      if (newsVideo) {
        const newsVideoResponse = await postNewsVideo(newsVideo);

        if (newsVideoResponse.error) {
          setLoading(false);
          const { code } = newsVideoResponse.error;
          switch (code) {
            case 500:
              throw new Error('Could not contact the server');
            case 400:
              throw new Error('Bad Request');
            default:
              throw new Error('Missing error code');
          }
        }
        setNewsVideoFilename(newsVideoResponse.data.filename);
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'News video has been uploaded.',
        });
      }
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  const downloadSrt = () => {
    const element = document.createElement("a");
    const file = new Blob([transcription], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.srt";
    document.body.appendChild(element);
    element.click();
  }

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'An error has occured',
        text: error,
      }).then(() => setError(''));
    }
  }, [error]);

  // useEffect(() => {
  //   async function fetchTranscription() {
  //     let transcriptionResponse = await getTranscription('xxx.srt')
  //     console.log(transcriptionResponse.status)
  //     if (transcriptionResponse.status === 200) {
  //       setTranscription(transcriptionResponse.data.transcription)
  //     }
  //   }
  //   fetchTranscription()
  // }, [transcription]);

  return (
    <div className="App">
      <div className="video-card">
        <Card body>
          <Col className="video-form">
            <Form>
              <FormGroup row>
                <Col sm={12}>
                  <CustomInput
                    type="file"
                    accept="*"
                    id="newsVideo"
                    name="customFile"
                    label="Masukan video siaran berita"
                    onChange={e => {
                      onFileChange(e.target.files[0])
                    }}
                  />
                </Col>
              </FormGroup>
              <Button
                className="btn-purple pill btn btn-secondary font-weight-bold"
                onClick={uploadNewsVideo}
                disabled={!newsVideo}
                >
                Unggah
              </Button>
            </Form>
          </Col>
        </Card>
      </div>
      <div className="transcription-card">
        <Card body>
          <div className="transcription-block">
            <Row>
              <Col sm={10} >
                <h5 className="text-left text-bold">
                  Transkripsi:
                </h5>
              </Col>
              <Col className="text-right" sm={2}>
                <Button
                  size="sm"
                  className="btn-purple pill-sm font-weight-bold"
                  onClick={downloadSrt}
                  disabled={!transcription}
                  >
                  Unduh .srt
                </Button>
              </Col>
            </Row>
            <div className="transcription">
              <p>
                {transcription}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;

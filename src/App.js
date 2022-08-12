import React from 'react';
import ScaleLoader from '@bit/davidhu2000.react-spinners.scale-loader';
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
      setError('Tidak dapat mengunggah file');
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
              throw new Error('Tidak dapat mengkontak server');
            case 400:
              throw new Error('Permintaan salah');
            default:
              throw new Error('Kode error tidak diketahui');
          }
        }
        setNewsVideoFilename(newsVideoResponse.data.filename);
        setTranscription(newsVideoResponse.data.transcription)
        setLoading(false);
        await Swal.fire({
          icon: 'success',
          title: 'Sukses',
          text: 'Subtitles berhasil dibuat',
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
    element.download = newsVideoFilename + ".srt";
    document.body.appendChild(element);
    element.click();
  }

  const loadingComponent = loading ? (
    <div className="loading-overlay">
      <ScaleLoader color='#543592' />
    </div>
  ) : null;

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan terjadi',
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
      <div>
        {loadingComponent}
      </div>
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
                    label="Upload video"
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
                Buat Subtitles
              </Button>
            </Form>
          </Col>
        </Card>
      </div>
      <div className="transcription-card">
        <Card body>
          <div className="transcription-block">
            <Row>
              <Col xs={6} sm={6} md={9} >
                <h5 className="text-left text-bold">
                  Subtitles:
                </h5>
              </Col>
              <Col className="text-right" xs={6} sm={6} md={3}>
                <Button
                  size="sm"
                  className="btn-purple pill-sm font-weight-bold"
                  onClick={downloadSrt}
                  disabled={!transcription}
                  >
                  Simpan .srt
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

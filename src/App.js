import React from 'react';
import { useState, useEffect} from 'react';
import {
  Card,
  Form,
  FormGroup,
  Button,
  Col,
  Label,
  CustomInput
} from 'reactstrap';

const App = () => {
  const [newsVideo, setNewsVideo] = useState(undefined);
  const [newsVideoError, setNewsVideoError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const errorSetters = {
    newsVideo: setNewsVideoError,
  }
  const onSubmit = async () => {
    try {
      setLoading(true);
      if (newsVideo) {
        // const newsVideoResponse = await postEmployeeFile({
          // employee: employeeId || employeeResponse._id,
          // file: newsVideo,
          // type: 'indonesianId'
        // });

        // if (newsVideoResponse.error) {
        //   setLoading(false);
        //   const { code } = newsVideoResponse.error;
        //   switch (code) {
        //     case 500:
        //       throw new Error('Could not contact the server');
        //     case 400:
        //       throw new Error('Bad Request');
        //     case 401:
        //       throw new Error('You are unauthorized');
        //     case 403:
        //       throw new Error('Forbidden');
        //     default:
        //       throw new Error('Missing error code');
        //   }
        // }

        // newsVideoId = newsVideoResponse._id;
      }
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }

  };

  return (
    <div className="App">
      <div className="video-card">
        <Card body>
          <div className="video-form">
            <Form>
              <FormGroup row>
                <Col sm={12}>
                  <CustomInput
                    type="file"
                    accept="video/*"
                    id="newsVideo"
                    name="customFile"
                    label="Masukan video berita"
                  />
                </Col>
              </FormGroup>
              <Button
                className="btn-purple pill btn btn-secondary font-weight-bold"
                onClick={onSubmit}
                >
                Submit
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;

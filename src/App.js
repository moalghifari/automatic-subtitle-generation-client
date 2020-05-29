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
      <div className="transcription-card">
        <Card body>
          <div className="transcription-block">
            <h5 className="text-left text-bold">
              Transcription:
            </h5>
            <div className="transcription">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet enim tortor at auctor. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. At elementum eu facilisis sed odio morbi quis commodo. Eros donec ac odio tempor orci dapibus ultrices in. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Commodo nulla facilisi nullam vehicula ipsum a arcu. Integer vitae justo eget magna fermentum iaculis eu. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Cras fermentum odio eu feugiat pretium. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci.
                Consequat ac felis donec et odio pellentesque diam. Accumsan sit amet nulla facilisi morbi. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Cursus mattis molestie a iaculis at erat pellentesque. Ac auctor augue mauris augue neque. Facilisis gravida neque convallis a cras semper auctor. Risus nullam eget felis eget nunc. In fermentum et sollicitudin ac. Proin libero nunc consequat interdum varius sit amet. Nulla at volutpat diam ut venenatis tellus. Amet justo donec enim diam vulputate. Eget est lorem ipsum dolor sit. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Sed velit dignissim sodales ut eu sem integer vitae. Pulvinar neque laoreet suspendisse interdum consectetur libero.
                Bibendum enim facilisis gravida neque convallis a cras semper auctor. Amet mattis vulputate enim nulla aliquet porttitor. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Tempor orci eu lobortis elementum nibh tellus molestie. Sapien et ligula ullamcorper malesuada. Auctor elit sed vulputate mi sit amet mauris. Mauris a diam maecenas sed enim ut sem viverra aliquet. Eget arcu dictum varius duis at. Est ultricies integer quis auctor elit sed vulputate mi. Ultricies integer quis auctor elit sed vulputate mi sit amet. Proin sagittis nisl rhoncus mattis rhoncus. Interdum varius sit amet mattis vulputate enim nulla.
                Turpis egestas pretium aenean pharetra magna. Malesuada proin libero nunc consequat interdum varius. Amet tellus cras adipiscing enim eu turpis egestas pretium. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Nam libero justo laoreet sit amet cursus sit amet dictum. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Nisl nunc mi ipsum faucibus vitae aliquet nec. Scelerisque eu ultrices vitae auctor eu augue. Euismod quis viverra nibh cras pulvinar mattis. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Mauris pharetra et ultrices neque ornare.
                Eget arcu dictum varius duis at consectetur lorem donec massa. Integer vitae justo eget magna fermentum iaculis eu non. Tellus molestie nunc non blandit massa. Et tortor at risus viverra adipiscing at in tellus. Aliquet enim tortor at auctor urna nunc id cursus. Purus in mollis nunc sed id semper risus in. Luctus accumsan tortor posuere ac ut consequat semper viverra. Duis convallis convallis tellus id. Sagittis purus sit amet volutpat consequat mauris nunc. Nunc consequat interdum varius sit amet mattis vulputate enim. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sem et tortor consequat id porta nibh venenatis. In massa tempor nec feugiat nisl. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo. Amet mauris commodo quis imperdiet. Lobortis elementum nibh tellus molestie nunc non blandit massa. Ac turpis egestas sed tempus urna et. Enim neque volutpat ac tincidunt. Arcu bibendum at varius vel pharetra vel turpis nunc. In eu mi bibendum neque egestas.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;

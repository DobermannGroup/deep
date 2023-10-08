import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const ws = new WebSocket('wss://deepaudio.uk:8080');
    const peerConnection = new RTCPeerConnection();

    ws.addEventListener('message', event => {
      const msg = JSON.parse(event.data);
      if (msg['offer']) {
        const remoteOffer = new RTCSessionDescription(msg['offer']);
        peerConnection.setRemoteDescription(remoteOffer).then(() => {
          return peerConnection.createAnswer();
        }).then(answer => {
          return peerConnection.setLocalDescription(answer);
        }).then(() => {
          ws.send(JSON.stringify({ 'answer': peerConnection.localDescription }));
        });
      } else if (msg['ice-candidate']) {
        const iceCandidate = new RTCIceCandidate(msg['ice-candidate']);
        peerConnection.addIceCandidate(iceCandidate);
      }
    });

    peerConnection.ontrack = event => {
      const video = document.getElementById('remoteVideo');
      video.srcObject = event.streams[0];
    };
  }, []);

  return <video id="remoteVideo" autoPlay></video>;
}

export default App;

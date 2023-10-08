import React, { useEffect } from 'react';

function Setup() {
  useEffect(() => {
    const ws = new WebSocket('wss://deepaudio.uk:8080');
    const peerConnection = new RTCPeerConnection();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      const video = document.getElementById('localVideo');
      video.srcObject = stream;
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    });

    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        ws.send(JSON.stringify({ 'ice-candidate': event.candidate }));
      }
    };

    peerConnection.createOffer()
      .then(offer => peerConnection.setLocalDescription(offer))
      .then(() => {
        ws.send(JSON.stringify({ 'offer': peerConnection.localDescription }));
      });
  }, []);

  return <video id="localVideo" autoPlay muted></video>;
}

export default Setup;

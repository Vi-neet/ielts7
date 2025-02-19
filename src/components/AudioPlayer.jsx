/* eslint-disable react/prop-types */
const AudioPlayer = ({ audioUrl }) => {
  return (
    <div className="w-full mb-8">
      <audio controls className="w-full mb-4">
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
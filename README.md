IDE-A
=================

IDE-A is a collaborative text editor built on ReactJS frontend with Yjs, WebRTC, PeerJS, and Tailwind CSS. This project enables real-time document editing between users in a room and also provides a voice call feature between them.


## Getting Started

#### To use IDE-A, follow these steps:

    Fork the repository to your GitHub account.
    Clone the forked repository to your local machine.
    Install the required dependencies by running `npm i` in the project directory.
    Install PeerJS globally by running `npm i peer -g.`
    Start the PeerJS server by running the following command: `peerjs --port 9000 --key peerjs --path /.`
    Start the client by running `npm run dev.`

## Dependencies

IDE-A relies on the following dependencies:

    ReactJS
    Yjs
    WebRTC
    PeerJS
    Tailwind CSS

## Usage

Once you have followed the steps in the "Getting Started" section, you can use IDE-A to collaborate on documents with others in real-time. To start a new document collaboration session, open the app and create a new room. You can then share the room link with others who you want to collaborate with. Once they join the room, everyone can edit the document in real-time.

IDE-A also provides a voice call feature that allows you to communicate with others in the same room. To start a voice call, simply click the call button in the app.

## Contributing

If you want to contribute to IDE-A, please feel free to submit a pull request. We welcome all contributions, including bug fixes, feature requests, and code improvements.

## License

IDE-A is licensed under the MIT License. You can find more information in the LICENSE file in the project directory.
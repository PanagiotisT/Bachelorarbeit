# Create Requirements.txt with -> pip freeze > requirements.txt
import os
import shutil

from flask_socketio import SocketIO, emit
from flask import Flask, request

import pathlib
import pickle
from utils import extract_feature
from pydub import AudioSegment

app = Flask(__name__)
port = 5000

socketio = SocketIO(app, binary=True, cors_allowed_origins='*')
createdFolder = False
audioBlobs = []
emotions = []
count = 0
currentSocketId = ""
audioFolderPath = ""


@socketio.on('connect')
def onConnect():
    global currentSocketId
    global audioFolderPath
    currentSocketId = request.sid
    audioFolderPath = 'speechRecognition/Audios/' + currentSocketId
    print(currentSocketId + ' connected')


@socketio.on('receive-audio-blob')
def receiveAudioBlob(blob):
    print('Blob received')
    pathlib.Path(audioFolderPath).mkdir(parents=True, exist_ok=True)
    global createdFolder
    global audioBlobs
    global count
    audioBlobs.append(blob)
    createdFolder = True
    count += 1
    with open(audioFolderPath + '/' + str(count) + '.wav', mode='bx') as f:
        f.write(blob)


@socketio.on('stop-record-audio')
def stopRecording(empty):
    combineAudioBlobs()

    model = pickle.load(open("speechRecognition/Models/mlp_classifier30-Apr17-09-37.model", "rb"))
    fullFeatures = extract_feature(audioFolderPath + '/FULL-AUDIO.wav', mfcc=True, chroma=True, mel=True).reshape(1, -1)
    emotion = model.predict(fullFeatures)[0]
    emit('receive-emotions', emotion)
    resetValues()


def combineAudioBlobs():
    sounds = []
    os.listdir(audioFolderPath)
    for i in range(1, count):
        sounds.append(AudioSegment.from_wav(audioFolderPath + '/' + str(i) + '.wav'))
    combined = sounds[0]
    for i in range(1, len(sounds)):
        combined = combined + sounds[i]
    combined.export(audioFolderPath + '/FULL-AUDIO.wav', format="wav")

def resetValues():
    # Delete Folder and reset Values
    global audioBlobs
    global emotions
    global count
    deleteFolder()
    audioBlobs = []
    emotions = []
    count = 0


@socketio.on('disconnect')
def disconnect():
    resetValues()
    print('Client ' + currentSocketId + ' disconnected')


def deleteFolder():
    if createdFolder:
        shutil.rmtree(audioFolderPath)
        print(audioFolderPath + ' deleted successfully')


if __name__ == '__main__':
    socketio.run(app)

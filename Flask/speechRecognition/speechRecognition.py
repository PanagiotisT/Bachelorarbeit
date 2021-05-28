import pickle
from utils import extract_feature

if __name__ == "__main__":
    model = pickle.load(open("Models/mlp_classifier30-Apr17-22-52.model", "rb"))
    model2 = pickle.load(open("Models/mlp_classifier30-Apr17-09-37.model", "rb"))
    model3 = pickle.load(open("Models/SVC_classifier30-Apr17-24-12.model", "rb"))

    audioFolder = "Audios/"

    neutralAudio = "0.wav"
    neutralFeatures = extract_feature(audioFolder + neutralAudio, mfcc=True, chroma=True, mel=True).reshape(1, -1)
    neutralAudioEmotion = model2.predict(neutralFeatures)[0]
    print("Neutrale Datei Ergebnis:", neutralAudioEmotion)

    wutAudio ="1.wav"
    wutFeatures = extract_feature(audioFolder + wutAudio, mfcc=True, chroma=True, mel=True).reshape(1, -1)
    wutAudioEmotion = model2.predict(wutFeatures)[0]
    print("Wut Datei Ergebnis:", wutAudioEmotion)




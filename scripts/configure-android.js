const fs = require('fs');
const path = require('path');

const manifestPath = path.join('android', 'app', 'src', 'main', 'AndroidManifest.xml');
let xml = fs.readFileSync(manifestPath, 'utf8');

if (!xml.includes('android.permission.RECORD_AUDIO')) {
  xml = xml.replace(
    '<application',
    '    <uses-permission android:name="android.permission.RECORD_AUDIO" />\n    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />\n    <application'
  );
}

if (!xml.includes('android.speech.RecognitionService')) {
  const queriesBlock = `    <queries>
        <intent>
            <action android:name="android.speech.RecognitionService" />
        </intent>
    </queries>
</manifest>`;
  xml = xml.replace('</manifest>', queriesBlock);
}

fs.writeFileSync(manifestPath, xml, 'utf8');
console.log('AndroidManifest.xml configured for Native Speech Recognition!');

import Firebase from 'firebase';
import { db, createTimestamp, auth } from '../../config';
import { profileConverter } from './converters';

export default class Profile {

  constructor (
    public userId: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public created: Firebase.firestore.Timestamp | Date = createTimestamp()
  ) { }

  static async dbProfile(id?: string): Promise<any> {
    let profileData;

    if (id) (profileData = await db.collection('profiles').doc(id).withConverter(profileConverter).get());
    else (profileData = await db.collection('profiles').where('userId', '==', auth.currentUser.uid).limit(1).withConverter(profileConverter).get());
  
    if (!profileData) return null;

    return id ? profileData.data() : profileData.docs[0].data()    
  }

}
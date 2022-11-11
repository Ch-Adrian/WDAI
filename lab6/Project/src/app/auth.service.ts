import { Injectable, OnChanges } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, collectionData, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Auth, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, getAuth, inMemoryPersistence, onAuthStateChanged, Persistence, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Review } from './review';
import { IAmString } from './supply.service';
import { IAmUser, User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  public logingKey: String = 'Zaloguj';
  isLogged: boolean = false;
  errorTable: string[] =[];
  userLoggedName: string|null = "";
  userLoggedId: string|undefined = '';
  isAdmin: boolean= false;
  public isLoggedManager: boolean = false;
  users: Array<User> = [];
  isError: boolean= false;
  persis = browserLocalPersistence;
  isBanned: boolean = false;
  isReview: boolean = false;
  isRate: boolean = false;

  constructor(private firestore: Firestore, private fireBase: FirebaseApp, private r: Router){//, private a: AngularFireAuth) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.getFireUserById(user.uid).forEach((u) =>{
                  this.userLoggedName = u.name;
                  this.isLoggedManager = u.isManager || u.isAdmin;
                  this.isBanned = u.isBanned;
                  this.isReview = u.isReview;
                  this.isRate = u.isRate;
                  this.userLoggedId = u.id;
                  this.isAdmin = u.isAdmin;
              })
              this.isError = false;
          if(this.isLogged == false){
            this.isLogged = true;
            if(this.logingKey == 'Zaloguj'){
              this.logingKey = 'Wyloguj';
            }
          }
          this.r.navigate(['home']);
      } else {
          this.isBanned = false;
          this.isLoggedManager = false;
          this.userLoggedName = "";
          this.isReview = false;
          this.isRate = false;
          this.userLoggedId = '';
          this.isAdmin = false;
      }
    });
    this.getFirePersis();
    this.getFireUsers();
   }

   setPersistenceInApp(s: string){
    if(s == 'none'){
      this.persis = inMemoryPersistence;
    } else if( s == 'session'){
      this.persis = browserSessionPersistence;
    } else{
      this.persis = browserLocalPersistence;
    }
   }

   getFireUsers(){
    const usersRef = collection(this.firestore, 'users');
    const usersArr =  collectionData(usersRef, {idField: 'id'}) as Observable<IAmUser[]>;
    usersArr.subscribe(res => {
      this.users = [];
      res.forEach( d => this.users.push(d));
    });
  }

  getFireUserById(id: string): Observable<IAmUser>{
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: 'id'}) as Observable<IAmUser>;
  }
     
  addFireUser(uid:string, role: string[], name: string, email: string){

    let user  = new User(role, name, email);
    user.userdata = [];
    let isManager: boolean = false;
    let isAdmin: boolean = false;
    let isClient: boolean = false;
    role.forEach( rl =>{
      switch(rl){
          case 'admin': isAdmin = true; break;
          case 'manager': isManager = true; break;
          case 'client' : isClient = true; break;
          default: break;
      }
  });
    let u = {
      isAdmin,
      isManager,
      isClient,
      role,
      name,
      email
    };
      setDoc(doc(this.firestore, 'users', uid), u).then( data =>{
          user.id = uid;
          this.updateFireUser(user, {id: uid});
          this.updateFireUser(user, {userdata: []});
      });

      this.users.push(user);
  }

  getFirePersis(){
    const persisRef = collection(this.firestore, 'persistence');
    const persisArr =  collectionData(persisRef, {idField: 'id'}) as Observable<IAmString[]>;
    persisArr.subscribe(res => {
      res.forEach( d => this.setPersistenceInApp(d.str));
    });
  }

  addStr(where: string, what: IAmString, id: string){
    const ref = collection(this.firestore, where);
    setDoc(doc(this.firestore, where, id), what);
  }

  updateFirePersis(p: string, id: string){
    const persisDocRef = doc(this.firestore, `persistence/${id}`);
    return updateDoc(persisDocRef, {str: p});
  }

  updateBanUser(u: User, val: boolean){
    this.updateFireUser(u, {isBanned: val});
  }

  updateUsers(){
    this.users.forEach(u =>{
      this.updateFireUser(u, {userdata: []})
    })
  }

  updateFireUser(user: IAmUser, obj: any){
    const dishDocRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(dishDocRef, obj);
  }


  signIn(n: string, e: string, pass: string){
    let err = false;
    let auth = getAuth();
    setPersistence(auth, this.persis).then( () => {
      signInWithEmailAndPassword(auth, e, pass)
        .then((userCredential) => {
          err = false;
          this.isError = false;
          this.userLoggedName = n;
          if(this.isLogged == false){
            this.isLogged = true;
            if(this.logingKey == 'Zaloguj'){
              this.logingKey = 'Wyloguj';
            }
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          if(errorCode == 'auth/invalid-email'){
            this.errorTable.push("Invalid email.")
          } else if(errorCode == 'auth/user-not-found'){
            this.errorTable.push("User not found.")
          } else if(errorCode == 'auth/wrong-password'){
            this.errorTable.push("Wrong password.")
          }
          this.isError = true;
        });
    });
  }

  signUp(n: string, e: string, p: string){
    let err= false;
    let auth = getAuth();
    setPersistence(auth, this.persis).then( () => {
    createUserWithEmailAndPassword(auth, e, p)
    .then((userCredential) => {
      err = false;
      this.addFireUser(userCredential.user.uid, ['client'], n, e);
      this.userLoggedName = n;
      this.isError = false;

      if(this.isLogged == false){
        this.isLogged = true;
        if(this.logingKey == 'Zaloguj'){
          this.logingKey = 'Wyloguj';
        }
      }
    })
    .catch((error) => {
      err = true;
      const errorCode = error.code;
      if(errorCode == 'auth/invalid-email'){
        this.errorTable.push("Invalid email.")
      } else if(errorCode == 'auth/user-not-found'){
        this.errorTable.push("User not found.")
      } else if(errorCode == 'auth/wrong-password'){
        this.errorTable.push("Wrong password.")
      } else if(errorCode == 'auth/weak-password'){
        this.errorTable.push("Weak password")
      } else if(errorCode == 'auth/email-already-in-use'){
        this.errorTable.push("Email already in use")
      }
      this.isError = true;
    });
  });
  }

  signOut(){
    let auth = getAuth();
    setPersistence(auth, this.persis).then( () => {
    signOut(auth).then(()=>{
      if(this.isLogged == true){
        this.isLogged = false;
        if(this.logingKey == 'Wyloguj'){
          this.logingKey = 'Zaloguj';
        }
      }
    }).catch( (error) =>{
      console.log(error);
    })
  });
  }
    
  getLastError(): string{
    return this.errorTable[this.errorTable.length-1];
  }
}

export class UserFriendsModel {
  friends: Array<{
    image: string,
    name: string,
    job: string,
    followers: string,
    followings: string,
    following: boolean}> = [
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    },
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: true
    },
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    },
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    }
  ];
  followers: Array<{
    image: string,
    name: string,
    job: string,
    followers: string,
    followings: string,
    following: boolean}> = [
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    },
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    },
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    },
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: true
    }
  ];
  following: Array<{
    image: string,
    name: string,
    job: string,
    followers: string,
    followings: string,
    following: boolean}> = [
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    },
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    },
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    },
    {
      image: '',
      name: '',
      job: '',
      followers: '',
      followings: '',
      following: false
    }
  ];

  constructor(readonly isShell: boolean) { }
}

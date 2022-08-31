import { Navigation } from 'react-native-navigation'
import screens from '../constants/Screens'
import Landing from './Landing'
import BarcodeScan from './BarcodeScan'
import GetHelp from './GetHelp'
import SignUp from './SignUp'
import SignIn from './SignIn'
import CreateProfile from './CreateProfile'
import Home from './Home'
import Club from './Club'
import Classes from './Classes'
import MyClasses from './MyClasses'
import Community from './Community'
import ForumView from './ForumView'
import ForumQuestions from './ForumQuestions'
import CreateQuestion from './CreateQuestion'
import Members from './Members'
import MemberProfile from './MemberProfile'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Menu from './Menu'
import Membership from './Membership'
import Notifications from './Notifications'
import Friends from './Friends'
import Messages from './Messages'
import Conversation from './Conversation'
import ClassDetail from './ClassDetail'

// register all screens of the app (including internal ones)
export function registerScreens (store, Provider) {
  Navigation.registerComponent(screens.LANDING, () => Landing, store, Provider)
  Navigation.registerComponent(screens.SIGNUP, () => SignUp, store, Provider)
  Navigation.registerComponent(screens.SIGNIN, () => SignIn, store, Provider)
  Navigation.registerComponent(screens.CREATEPROFILE, () => CreateProfile, store, Provider)
  Navigation.registerComponent(screens.BARCODESCAN, () => BarcodeScan, store, Provider)
  Navigation.registerComponent(screens.GETHELP, () => GetHelp, store, Provider)
  Navigation.registerComponent(screens.HOME, () => Home, store, Provider)
  Navigation.registerComponent(screens.CLUB, () => Club, store, Provider)
  Navigation.registerComponent(screens.CLASSES, () => Classes, store, Provider)
  Navigation.registerComponent(screens.MYCLASSES, () => MyClasses, store, Provider)
  Navigation.registerComponent(screens.COMMUNITY, () => Community, store, Provider)
  Navigation.registerComponent(screens.FORUMVIEW, () => ForumView, store, Provider)
  Navigation.registerComponent(screens.FORUMQUESTIONS, () => ForumQuestions, store, Provider)
  Navigation.registerComponent(screens.CREATEQUESTION, () => CreateQuestion, store, Provider)
  Navigation.registerComponent(screens.MEMBERS, () => Members, store, Provider)
  Navigation.registerComponent(screens.MEMBERPROFILE, () => MemberProfile, store, Provider)
  Navigation.registerComponent(screens.PROFILE, () => Profile, store, Provider)
  Navigation.registerComponent(screens.EDITPROFILE, () => EditProfile, store, Provider)
  Navigation.registerComponent(screens.MENU, () => Menu, store, Provider)
  Navigation.registerComponent(screens.MEMBERSHIP, () => Membership, store, Provider)
  Navigation.registerComponent(screens.NOTIFICATIONS, () => Notifications, store, Provider)
  Navigation.registerComponent(screens.FRIENDS, () => Friends, store, Provider)
  Navigation.registerComponent(screens.MESSAGES, () => Messages, store, Provider)
  Navigation.registerComponent(screens.CONVERSATION, () => Conversation, store, Provider)
  Navigation.registerComponent(screens.CLASSDETAIL, () => ClassDetail, store, Provider)
}
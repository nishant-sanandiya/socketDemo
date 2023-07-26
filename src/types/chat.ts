export interface ChatParticipantsType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  room_id: string;
  user_id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export interface LocationType {
  type: string;
  index: string;
  coordinates: number[];
}

export interface SenderType {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  bio: string;
  countryCode: string;
  userSignUpLevel: number;
  profilePicture: string;
  birthday: string;
  skillPoints: number;
  totalAttended: number;
  totalOrganized: number;
  facebookId: string;
  googleId: string;
  appleId: string;
  subscriptionEndDate: string;
  resetToken: string;
  isSubscribed: boolean;
  isFreeUser: boolean;
  selectedSportIds: string[];
  finishSteps: boolean;
  socketIds: string[];
  location: LocationType;
}

export interface ParticipantsType {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  history_id: string;
  sender_id: string;
  receiver_id: string;
  room_id: string;
}

export interface ChatHistorySenderIdType {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  bio: string;
  countryCode: string;
  userSignUpLevel: number;
  profilePicture: string;
  birthday: string;
  skillPoints: number;
  totalAttended: number;
  totalOrganized: number;
  facebookId: string;
  googleId: string;
  appleId: string;
  subscriptionEndDate: string;
  resetToken: string;
  isSubscribed: boolean;
  isFreeUser: boolean;
  selectedSportIds: string[];
  finishSteps: boolean;
  socketIds: string[];
  location: LocationType;
  socketId: string;
  isOnline: string;
  isActive: boolean;
  isDeleted: boolean;
  referralCode: string;
  referralBy: string;
  lastUsedAt: string;
  lastSeen: string;
  selectedSportId: string;
}

export interface ChatHistoryType {
  message_status_of_participants: ParticipantsType;
  _id: string;
  content: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  room_id: string;
  sender_id: ChatHistorySenderIdType;
  media_id: string;
}

export interface ChatType {
  history: ChatHistoryType[];
  participants: ChatParticipantsType[];
  _id: string;
  is_group: number;
  last_message_at: string;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  author_id: string;
  group_id: string;
  count: number;
}

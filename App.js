import React, { useState } from "react";
import {
  SafeAreaView, View, Text, ScrollView, Pressable, TextInput,
  Image, StyleSheet, StatusBar, Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PINK = "#e1306c";
const postsSeed = [
  { id: "1", user: "hoor", caption: "Welcome to HoorSocial 💗", likes: 120, comments: 14, color: "#ffe0ed", liked: false },
  { id: "2", user: "sara", caption: "A little moment of happiness ✨", likes: 85, comments: 9, color: "#e5e7ff", liked: false },
  { id: "3", user: "ali", caption: "Hello everyone! 👋", likes: 42, comments: 5, color: "#ddf7ee", liked: false }
];

export default function App() {
  const [tab, setTab] = useState("Home");
  const [posts, setPosts] = useState(postsSeed);
  const [following, setFollowing] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(["Welcome to HoorSocial chat 💬"]);
  const [messageDraft, setMessageDraft] = useState("");

  const toggleLike = (id) => setPosts(old => old.map(p =>
    p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p
  ));

  const addPost = () => {
    if (!draft.trim()) {
      Alert.alert("Write a caption", "Type a caption first, then create your demo post.");
      return;
    }
    setPosts(old => [{ id: String(Date.now()), user: "hoor", caption: draft.trim(), likes: 0, comments: 0, color: "#ffe0ed", liked: false }, ...old]);
    setDraft("");
    setTab("Home");
    Alert.alert("Post created", "This demo post is saved only while the app is running.");
  };

  const sendMessage = () => {
    if (!messageDraft.trim()) return;
    setMessages(old => [...old, messageDraft.trim()]);
    setMessageDraft("");
  };

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.logo}>HoorSocial</Text>
      <Pressable onPress={() => setTab("Chats")} accessibilityLabel="Open messages">
        <Ionicons name="paper-plane-outline" size={25} color="#222" />
      </Pressable>
    </View>
  );

  const Stories = () => (
    <View style={styles.storiesWrap}>
      <Text style={styles.sectionTitle}>Stories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {["Your story", "sara", "ali", "ayesha", "zoya"].map((name, i) => (
          <Pressable key={name} style={styles.story} onPress={() => Alert.alert("Stories", "Story feature will be connected in a later version.")}>
            <View style={[styles.storyCircle, { backgroundColor: ["#f8b4d0", "#fbcfe8", "#c4b5fd", "#f9a8d4", "#a7f3d0"][i] }]}>
              <Ionicons name={i === 0 ? "add" : "person"} size={25} color="#fff" />
            </View>
            <Text numberOfLines={1} style={styles.storyName}>{name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  const PostCard = ({ post }) => (
    <View style={styles.post}>
      <View style={styles.postUserRow}>
        <View style={styles.avatar}><Ionicons name="person" size={19} color="#fff" /></View>
        <Text style={styles.username}>{post.user}</Text>
        <Ionicons name="ellipsis-horizontal" size={22} color="#222" style={{ marginLeft: "auto" }} />
      </View>
      <View style={[styles.postArtwork, { backgroundColor: post.color }]}>
        <Ionicons name="heart" size={66} color={PINK} />
        <Text style={styles.artworkText}>HoorSocial</Text>
      </View>
      <View style={styles.actionsRow}>
        <Pressable style={styles.action} onPress={() => toggleLike(post.id)}>
          <Ionicons name={post.liked ? "heart" : "heart-outline"} size={27} color={post.liked ? PINK : "#222"} />
        </Pressable>
        <Pressable style={styles.action} onPress={() => Alert.alert("Comments", "Demo comments screen will be added next.")}>
          <Ionicons name="chatbubble-outline" size={25} color="#222" />
        </Pressable>
        <Pressable style={styles.action} onPress={() => Alert.alert("Share", "Sharing will be added in a later version.")}>
          <Ionicons name="paper-plane-outline" size={24} color="#222" />
        </Pressable>
      </View>
      <Text style={styles.likes}>{post.likes} likes</Text>
      <Text style={styles.caption}><Text style={styles.username}>{post.user} </Text>{post.caption}</Text>
      <Pressable onPress={() => Alert.alert("Comments", "Comment count: " + post.comments)}>
        <Text style={styles.comments}>View all {post.comments} comments</Text>
      </Pressable>
    </View>
  );

  const Home = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stories />
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </ScrollView>
  );

  const Profile = () => (
    <ScrollView contentContainerStyle={styles.screenPad}>
      <View style={styles.profileTop}>
        <View style={[styles.profileAvatar, { backgroundColor: "#f8b4d0" }]}><Ionicons name="person" size={42} color="#fff" /></View>
        <View style={styles.statsRow}>
          <Stat number={String(posts.length)} label="Posts" />
          <Stat number={following ? "121" : "120"} label="Followers" />
          <Stat number="80" label="Following" />
        </View>
      </View>
      <Text style={styles.profileName}>hoor ♡</Text>
      <Text style={styles.profileBio}>Welcome to my little corner of the internet 💗</Text>
      <Pressable style={styles.followButton} onPress={() => setFollowing(v => !v)}>
        <Text style={styles.followButtonText}>{following ? "Following" : "Follow demo account"}</Text>
      </Pressable>
      <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Your feed activity</Text>
      <Text style={styles.hint}>This is a local demo profile. Real accounts will need a backend.</Text>
    </ScrollView>
  );

  const Stat = ({ number, label }) => (
    <View style={styles.stat}><Text style={styles.statNum}>{number}</Text><Text style={styles.statLabel}>{label}</Text></View>
  );

  const Reels = () => (
    <View style={styles.reelsScreen}>
      <View style={styles.reelCard}>
        <Ionicons name="play-circle-outline" size={78} color="#fff" />
        <Text style={styles.reelTitle}>HoorSocial Reels</Text>
        <Text style={styles.reelSubtitle}>Short video feed preview</Text>
        <View style={styles.reelActions}>
          <Ionicons name="heart-outline" size={28} color="#fff" />
          <Ionicons name="chatbubble-outline" size={26} color="#fff" />
          <Ionicons name="paper-plane-outline" size={25} color="#fff" />
        </View>
      </View>
      <Text style={styles.hint}>Real video upload and playback will be added in the next version.</Text>
    </View>
  );

  const CreatePost = () => (
    <View style={styles.screenPad}>
      <Text style={styles.pageTitle}>Create a post</Text>
      <Text style={styles.hint}>Write a caption to create a demo feed post.</Text>
      <TextInput value={draft} onChangeText={setDraft} placeholder="What's on your mind? 💗" multiline style={styles.input} />
      <Pressable style={styles.primaryButton} onPress={addPost}><Text style={styles.primaryButtonText}>Share post</Text></Pressable>
      <Text style={styles.hint}>Photo/video picker will be added after this starter works.</Text>
    </View>
  );

  const Chats = () => (
    <View style={styles.screenPad}>
      <Text style={styles.pageTitle}>Messages</Text>
      <Text style={styles.hint}>Local demo chat — messages are not sent to other users yet.</Text>
      <ScrollView style={styles.chatMessages}>
        {messages.map((m, i) => <View key={i} style={[styles.messageBubble, i === 0 ? styles.theirMessage : styles.myMessage]}><Text>{m}</Text></View>)}
      </ScrollView>
      <View style={styles.sendRow}>
        <TextInput value={messageDraft} onChangeText={setMessageDraft} placeholder="Write a message..." style={styles.messageInput} />
        <Pressable onPress={sendMessage} style={styles.sendButton}><Ionicons name="send" color="#fff" size={20} /></Pressable>
      </View>
    </View>
  );

  const screens = {
    Home: <Home />,
    Reels: <Reels />,
    Create: <CreatePost />,
    Chats: <Chats />,
    Profile: <Profile />
  };

  const nav = [
    { key: "Home", icon: "home-outline" },
    { key: "Reels", icon: "play-circle-outline" },
    { key: "Create", icon: "add-circle-outline" },
    { key: "Chats", icon: "chatbubble-ellipses-outline" },
    { key: "Profile", icon: "person-circle-outline" }
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff7fb" />
      <Header />
      <View style={styles.body}>{screens[tab]}</View>
      <View style={styles.bottomNav}>
        {nav.map(item => (
          <Pressable key={item.key} style={styles.navItem} onPress={() => setTab(item.key)}>
            <Ionicons name={item.icon} size={25} color={tab === item.key ? PINK : "#777"} />
            <Text style={[styles.navLabel, tab === item.key && { color: PINK }]}>{item.key === "Create" ? "Post" : item.key}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff7fb" },
  header: { height: 58, paddingHorizontal: 17, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff" },
  logo: { fontSize: 27, fontWeight: "800", color: PINK, letterSpacing: -0.6 },
  body: { flex: 1, backgroundColor: "#fff" },
  storiesWrap: { paddingVertical: 13, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#f1f1f1" },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#222", marginBottom: 10 },
  story: { alignItems: "center", width: 69, marginRight: 5 },
  storyCircle: { width: 53, height: 53, borderRadius: 27, borderWidth: 2, borderColor: PINK, alignItems: "center", justifyContent: "center" },
  storyName: { fontSize: 11, marginTop: 5, color: "#333", maxWidth: 65 },
  post: { paddingBottom: 13, borderBottomWidth: 7, borderBottomColor: "#fafafa" },
  postUserRow: { flexDirection: "row", alignItems: "center", padding: 12 },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: PINK, alignItems: "center", justifyContent: "center" },
  username: { fontWeight: "700", color: "#222" },
  postArtwork: { height: 250, alignItems: "center", justifyContent: "center" },
  artworkText: { color: PINK, fontSize: 19, fontWeight: "800", marginTop: 6 },
  actionsRow: { flexDirection: "row", paddingHorizontal: 8, paddingTop: 5 },
  action: { padding: 5, marginRight: 8 },
  likes: { marginHorizontal: 13, marginBottom: 4, fontWeight: "700", color: "#222" },
  caption: { marginHorizontal: 13, color: "#222", lineHeight: 20 },
  comments: { color: "#777", marginHorizontal: 13, marginTop: 5, marginBottom: 5 },
  screenPad: { padding: 20, flexGrow: 1 },
  pageTitle: { fontSize: 25, fontWeight: "800", color: "#222", marginBottom: 10 },
  hint: { color: "#777", fontSize: 13, lineHeight: 19, marginVertical: 8 },
  input: { minHeight: 125, borderWidth: 1, borderColor: "#eadce3", borderRadius: 14, padding: 13, textAlignVertical: "top", marginTop: 12, backgroundColor: "#fff" },
  primaryButton: { backgroundColor: PINK, padding: 15, borderRadius: 12, alignItems: "center", marginTop: 13 },
  primaryButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  profileTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  profileAvatar: { width: 86, height: 86, borderRadius: 43, alignItems: "center", justifyContent: "center" },
  statsRow: { flexDirection: "row", flex: 1, justifyContent: "space-around", marginLeft: 8 },
  stat: { alignItems: "center" },
  statNum: { fontSize: 18, fontWeight: "800", color: "#222" },
  statLabel: { fontSize: 12, color: "#555", marginTop: 3 },
  profileName: { fontWeight: "800", fontSize: 17, marginTop: 16, color: "#222" },
  profileBio: { color: "#444", marginTop: 6, lineHeight: 20 },
  followButton: { backgroundColor: PINK, padding: 12, borderRadius: 10, alignItems: "center", marginTop: 14 },
  followButtonText: { color: "#fff", fontWeight: "700" },
  reelsScreen: { flex: 1, padding: 14, backgroundColor: "#fff", justifyContent: "center" },
  reelCard: { flex: 1, minHeight: 400, borderRadius: 22, backgroundColor: "#6e2852", alignItems: "center", justifyContent: "center", padding: 20 },
  reelTitle: { color: "#fff", fontSize: 24, fontWeight: "800", marginTop: 10 },
  reelSubtitle: { color: "#ffe4f0", marginTop: 5 },
  reelActions: { flexDirection: "row", gap: 25, marginTop: 28 },
  chatMessages: { flex: 1, marginVertical: 15 },
  messageBubble: { padding: 12, borderRadius: 14, marginVertical: 5, maxWidth: "85%" },
  theirMessage: { backgroundColor: "#f3f4f6", alignSelf: "flex-start" },
  myMessage: { backgroundColor: "#ffe0ed", alignSelf: "flex-end" },
  sendRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingBottom: 6 },
  messageInput: { flex: 1, borderWidth: 1, borderColor: "#eadce3", borderRadius: 22, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#fff" },
  sendButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: PINK, alignItems: "center", justifyContent: "center" },
  bottomNav: { height: 62, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#eee", flexDirection: "row", alignItems: "center", justifyContent: "space-around" },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 5 },
  navLabel: { fontSize: 10, color: "#777", marginTop: 2 }
});

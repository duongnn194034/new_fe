import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Hyperlink from "react-native-hyperlink";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import Statusbar from "../../components/Statusbar";
import { AntDesign, Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import Avatar from "../../components/Avatar";
import * as ImagePicker from "expo-image-picker";
import { imagePost, textPost } from "../../api";
import AppContext from "../../context/AppContext";
const MAX_NUMBER_IMAGE = 4;
const WIDTH_MODAL = Dimensions.get("window").width;
const IMAGE_HEIGHT = 400;
const IMAGE_INSET = 2;
const CloseModal = ({ changeModalVisible }) => {
  const appContext = useContext(AppContext)
  const navigation = useNavigation();
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={styles.header}>Tiếp tục với bài viết của bạn? </Text>
        <Text style={styles.content}>
          Nếu bỏ bây giờ, bạn sẽ mất bài viết này
        </Text>
        <View style={styles.Divider} />
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.navigate("Feed")}
        >
          <Text style={{ fontSize: 17, color: "red" }}>Bỏ bài viết</Text>
        </TouchableOpacity>
        <View style={styles.Divider} />
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => changeModalVisible(false)}
        >
          <Text style={{ fontSize: 17, color: "#3a86e9", fontWeight: "bold" }}>
            Tiếp tục chỉnh sửa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const PostErrModal = ({ setPostErrModal }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={styles.header}>
          Mỗi bài viết chỉ bao gồm tối đa 4 bức ảnh
        </Text>
        <View style={styles.Divider} />
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => setPostErrModal(false)}
        >
          <Text style={{ fontSize: 17, color: "red" }}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const TopBar = ({ enablePost, changeModalVisible, posting }) => {
  return (
    <View style={styles.topBarContainer}>
      <TouchableOpacity onPress={() => changeModalVisible(true)}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.textStyle}>Tạo bài viết</Text>
      <TouchableOpacity
        style={[
          styles.btnCreate,
          { backgroundColor: enablePost ? "#2697FF" : "#D9D9D9" },
        ]}
        disabled={enablePost ? false : true}
        onPress={() => {
          posting();
        }}
      >
        <Text
          style={{
            color: enablePost ? "#ffffff" : "rgba(0, 0, 0, 0.38)",
            fontSize: 17,
          }}
        >
          Đăng
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const User = ({ avatar }) => {
  return (
    <View style={styles.user}>
      <Avatar avatar={avatar} />
      <Text style={{ marginLeft: 8 }}>User 1</Text>
    </View>
  );
};
const DefaultLink = () => {
  return (
    <Hyperlink
      onPress={(url) => WebBrowser.openBrowserAsync(url)}
      linkStyle={{ color: "#2980b9", fontSize: 20 }}
    >
      <Text style={{ fontSize: 15 }}>
        This text will be parsed to check for clickable strings like
        https://github.com/obipawan/hyperlink and made clickable.
      </Text>
    </Hyperlink>
  );
};
const LongEditText = ({ setDescription }) => {
  return (
    <TextInput
      style={{ padding: 16 }}
      multiline
      onChangeText={(text) => {
        setDescription(text);
      }}
      placeholder="Bạn đang nghĩ gì?"
    />
  );
};
const CloseBtn = ({ removeImage, uri }) => {
  return (
    <TouchableOpacity style={styles.CloseBtn} onPress={() => removeImage(uri)}>
      <AntDesign name="close" size={24} color="black" />
    </TouchableOpacity>
  );
};
const FixedBottomBar = (props) => {
  return (
    <View style={styles.BottomBar}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={async () => {
            if (props.imageNum == 4) {
              props.setPostErrModal(true);
              return;
            }
            props.setIsLoading(true);
            const uploadImages = await takeImageAsync();
            props.setIsLoading(false);
            props.addImages(uploadImages);
          }}
          style={{ paddingRight: 8 }}
        >
          <Entypo name="camera" size={24} color="black" />
        </TouchableOpacity>
        <Text>Chọn ảnh hoặc emoticon</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={async () => {
            if (props.imageNum == MAX_NUMBER_IMAGE) {
              props.setPostErrModal(true);
              return;
            }
            props.setIsLoading(true);
            const uploadImages = await pickImageAsync();
            props.setIsLoading(false);
            if (uploadImages.length) {
              if (props.imageNum + uploadImages.length > MAX_NUMBER_IMAGE) {
                props.setPostErrModal(true);
                return;
              }
              props.addImages(uploadImages);
            }
          }}
        >
          <Feather name="image" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <MaterialIcons name="insert-emoticon" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const takeImageAsync = async () => {
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: false,
  });
  if (!result.canceled) {
    const output = result.assets[0];
    return output;
  }
  return [];
};
const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    orderedSelection: true,
  });
  if (!result.canceled) {
    // console.log(result.assets);
    const output = result.assets;
    return output;
  }
  return [];
};

const RenderImages = ({ images, removeImage }) => {
  switch (images.length) {
    case 1:
      return (
        <View style={styles.Full}>
          <Image
            source={{
              uri: images[0].uri,
            }}
            style={styles.ImageStyle}
          />
          <CloseBtn removeImage={removeImage} uri={images[0].uri} />
        </View>
      );
    case 2:
      return (
        <View style={styles.Full}>
          <View style={styles.LeftHalf}>
            <Image source={{ uri: images[0].uri }} style={styles.ImageStyle} />
            <CloseBtn removeImage={removeImage} uri={images[0].uri} />
          </View>
          <View style={styles.RightHalf}>
            <Image source={{ uri: images[1].uri }} style={styles.ImageStyle} />
            <CloseBtn removeImage={removeImage} uri={images[1].uri} />
          </View>
        </View>
      );
    case 3:
      return (
        <View style={styles.Full}>
          <View style={styles.LeftHalf}>
            <Image source={{ uri: images[0].uri }} style={styles.ImageStyle} />
            <CloseBtn removeImage={removeImage} uri={images[0].uri} />
          </View>
          <View style={styles.RightHalf}>
            <View style={styles.QuarterTop}>
              <Image
                source={{ uri: images[1].uri }}
                style={styles.ImageStyle}
              />
              <CloseBtn removeImage={removeImage} uri={images[1].uri} />
            </View>
            <View style={styles.QuarterBottom}>
              <Image
                source={{ uri: images[2].uri }}
                style={styles.ImageStyle}
              />
              <CloseBtn removeImage={removeImage} uri={images[2].uri} />
            </View>
          </View>
        </View>
      );
    case 4:
      return (
        <View style={styles.Full}>
          <View style={styles.LeftHalf}>
            <View style={styles.QuarterTop}>
              <Image
                source={{ uri: images[0].uri }}
                style={styles.ImageStyle}
              />
              <CloseBtn removeImage={removeImage} uri={images[0].uri} />
            </View>
            <View style={styles.QuarterBottom}>
              <Image
                source={{ uri: images[3].uri }}
                style={styles.ImageStyle}
              />
              <CloseBtn removeImage={removeImage} uri={images[3].uri} />
            </View>
          </View>
          <View style={styles.RightHalf}>
            <View style={styles.QuarterTop}>
              <Image
                source={{ uri: images[1].uri }}
                style={styles.ImageStyle}
              />
              <CloseBtn removeImage={removeImage} uri={images[1].uri} />
            </View>
            <View style={styles.QuarterBottom}>
              <Image
                source={{ uri: images[2].uri }}
                style={styles.ImageStyle}
              />
              <CloseBtn removeImage={removeImage} uri={images[2].uri} />
            </View>
          </View>
        </View>
      );
    default:
      return;
  }
};
const Post = () => {
  const appContext = useContext(AppContext)
  const navigation = useNavigation();
  const [enablePost, setEnablePost] = useState(false);
  const [enableModal, setEnableModal] = useState(false);
  const [postErrModal, setPostErrModal] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const changeModalVisible = (bool) => {
    setEnableModal(bool);
  };
  const addImages = (newImages) => {
    let cbImages = images.concat(newImages);
    setImages(cbImages);
  };

  const removeImage = (rmImage) => {
    const filterImages = images.filter((image) => image.uri !== rmImage);
    setImages(filterImages);
  };
  useEffect(() => {
    if (images.length || description) setEnablePost(true);
    else setEnablePost(false);
  }, [images, description]);
  const posting = () => {
    const formData = new FormData();
    images.forEach((image) => {
      let localUri = image.uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append("image", {
        uri: Platform.OS === "android" ? localUri : "file://" + localUri,
        name: filename,
        type: type,
      });
      console.log(image);
    });
    setIsLoading(true);
    if (images.length) {
      imagePost(description, formData, appContext.loginState.token)
        .then((res) => {
          console.log(res.data.data);
          setIsLoading(false);
          navigation.navigate({
            name: "Feed",
            params: { post: true, post_id: res.data.data.id },
          });
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    } else
      textPost(description, formData, appContext.loginState.token)
        .then((res) => {
          console.log(res.data.data);
          setIsLoading(false);
          navigation.navigate({
            name: "Feed",
            params: { post: true, post_id: res.data.data.id },
          });
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
  };
  return (
    <>
      <Statusbar backgroundColor="#eeeeee" />
      {isLoading && (
        <View style={{ backgroundColor: "transparent" }}>
          <Text
            style={{ fontSize: 20, fontWeigh: "bold", textAlign: "center" }}
          >
            {" "}
            Loading...
          </Text>
          <ActivityIndicator size={"large"} />
        </View>
      )}
      <TopBar
        images={images}
        description={description}
        enablePost={enablePost}
        changeModalVisible={changeModalVisible}
        posting={posting}
      />
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <User />
          <LongEditText setDescription={setDescription} />
          <RenderImages images={images} removeImage={removeImage} />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={enableModal}
          onRequestClose={() => {
            changeModalVisible(false);
          }}
        >
          <CloseModal changeModalVisible={changeModalVisible} />
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={postErrModal}
          onRequestClose={() => {
            setPostErrModal(false);
          }}
        >
          <PostErrModal setPostErrModal={setPostErrModal} />
        </Modal>
      </ScrollView>
      <FixedBottomBar
        style={styles.BottomBar}
        addImages={addImages}
        imageNum={images.length}
        setPostErrModal={setPostErrModal}
        setIsLoading={setIsLoading}
      />
    </>
  );
};
export default Post;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBarContainer: {
    backgroundColor: "#eeeeee",
    borderBottomColor: "solid #000000",
    width: "100%",
    height: 93,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 8,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
  },
  textStyle: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 21,
    marginLeft: 16,
  },
  btnCreate: {
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
  },
  postContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
  },
  user: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modal: {
    width: WIDTH_MODAL - 80,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "column",
  },
  header: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    marginTop: 8,
  },
  Divider: {
    width: "100%",
    height: 0.3,
    backgroundColor: "#000000",
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    margin: 8,
    width: 100,
  },
  Photo: {
    width: "100%",
    height: 300,
  },
  BottomBar: {
    width: "100%",
    height: 49,
    borderColor: "rgba(0, 0, 0, 0.32)",
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  CloseBtn: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "#eeeeee",
    borderRadius: 12,
  },
  ImageStyle: {
    width: "100%",
    height: "100%",
  },
  Full: {
    flexDirection: "row",
    width: WIDTH_MODAL,
    height: IMAGE_HEIGHT,
  },
  RightHalf: {
    flexDirection: "column",
    width: WIDTH_MODAL / 2 - IMAGE_INSET,
    height: IMAGE_HEIGHT,
    marginLeft: IMAGE_INSET,
  },
  LeftHalf: {
    flexDirection: "column",
    width: WIDTH_MODAL / 2 - IMAGE_INSET,
    height: IMAGE_HEIGHT,
    marginRight: IMAGE_INSET,
  },
  QuarterTop: {
    width: "100%",
    height: IMAGE_HEIGHT / 2 - IMAGE_INSET,
    marginBottom: IMAGE_INSET,
  },
  QuarterBottom: {
    width: "100%",
    height: IMAGE_HEIGHT / 2 - IMAGE_INSET,
    marginTop: IMAGE_INSET,
  },
});

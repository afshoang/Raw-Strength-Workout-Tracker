import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const CustomAlert = (props) => {
    const [iOSDefaults, setIOSDefaults] = useState({
        container: {
            backgroundColor: (props.ios && props.ios.container && props.ios.container.backgroundColor) || '#F8F8F8',
        },
        title: {
            color: (props.ios && props.ios.title && props.ios.title.color) || '#000000',
            fontSize: (props.ios && props.ios.title && props.ios.title.fontSize) || 17,
            fontWeight: (props.ios && props.ios.title && props.ios.title.fontWeight) || '600',
        },
        message: {
            color: (props.ios && props.ios.message && props.ios.message.color) || '#000000',
            fontSize: (props.ios && props.ios.message && props.ios.message.fontSize) || 13,
            fontWeight: (props.ios && props.ios.message && props.ios.message.fontWeight) || 'normal',
        },
        button: {
            color: '#387ef5',
            fontSize: 17,
            fontWeight: '500',
            textTransform: 'none',
            backgroundColor: 'transparent',
        },
    });

    const IOSButtonBox = () => {
        const buttonProps = props.buttons && props.buttons.length > 0 ? props.buttons : [{}]
        const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(buttonProps.length === 2 ? 1 : 0);


        return (
            <View style={[styles.iOSButtonGroup, {
                flexDirection: buttonLayoutHorizontal === 1 ? "row" : "column",
            }]} onLayout={(e) => {
                if (e.nativeEvent.layout.height > 60)
                    setButtonLayoutHorizontal(0);
            }}>
                {
                    buttonProps.map((item, index) => {
                        let defaultButtonText = 'OK'
                        if (buttonProps.length > 2) {
                            if (index === 0)
                                defaultButtonText = 'ASK ME LATER'
                            else if (index === 1)
                                defaultButtonText = 'CANCEL';
                        } else if (buttonProps.length === 2 && index === 0)
                            defaultButtonText = 'CANCEL';
                        const singleButtonWrapperStyle = {}
                        let singleButtonWeight = iOSDefaults.button.fontWeight;
                        if (index === buttonProps.length - 1) {
                            singleButtonWeight = '700';
                        }
                        if (buttonLayoutHorizontal === 1) {
                            singleButtonWrapperStyle.minWidth = '50%';
                            if (index === 0) {
                                singleButtonWrapperStyle.borderStyle = 'solid';
                                singleButtonWrapperStyle.borderRightWidth = 0.55;
                                singleButtonWrapperStyle.borderRightColor = '#dbdbdf';
                            }

                        }
                        return (
                            <View style={[styles.iOSButton, singleButtonWrapperStyle]} key={index}>
                                <Pressable onPress={() => {
                                    props.setModalVisible(false)
                                    if (item.func && typeof (item.func) === 'function')
                                        item.func();
                                }}>
                                    <View style={[styles.iOSButtonInner, { backgroundColor: (item.styles && item.styles.backgroundColor) || iOSDefaults.button.backgroundColor }]}>
                                        <Text
                                            style={{
                                                color: (item.styles && item.styles.color) || iOSDefaults.button.color,
                                                fontSize: (item.styles && item.styles.fontSize) || iOSDefaults.button.fontSize,
                                                textTransform: (item.styles && item.styles.textTransform) || iOSDefaults.button.textTransform,
                                                textAlign: 'center'
                                            }}
                                        >{item.text || defaultButtonText}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        )
                    })
                }
            </View>
        );
    }
    return (
        <>
        {props.modalVisible && <Pressable style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} onPress={() => props.setModalVisible(false)} /> }
        <Modal
            animationType="fade"
            transparent={true}
            onBackdropPress={() => props.setModalVisible(false)}
            visible={props.modalVisible}
            style={{
                margin: 0,
                position: 'absolute',
                top: '40%',
                width: '100%',
            }}
        >
            <View style={styles.alertBox}>
                <View style={[styles.iOSAlertBox, iOSDefaults.container]}>
                    <Text style={[styles.iOSTitle, iOSDefaults.title]}>{props.title || 'Message'}</Text>
                    <Text style={[styles.iOSMessage, iOSDefaults.message]}>{props.message || ''}</Text>
                    <IOSButtonBox />
                </View>
            </View>
        </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    alertBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iOSAlertBox: {
        maxWidth: 300, //270
        width: '100%',
        zIndex: 10,
        borderRadius: 13,
    },
    iOSTitle: {
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 7,
        paddingLeft: 16,
        marginTop: 8,
        textAlign: "center",
    },
    iOSMessage: {
        paddingTop: 0,
        paddingRight: 16,
        paddingBottom: 21,
        paddingLeft: 16,
        textAlign: "center"
    },
    iOSButtonGroup: {
        marginRight: -0.55
    },
    iOSButton: {
        borderTopColor: '#dbdbdf',
        borderTopWidth: 0.55,
        borderStyle: 'solid',
    },
    iOSButtonInner: {
        minHeight: 44,
        justifyContent: 'center'
    }
});

export default CustomAlert;
import { COLORS } from '../constants';
import { useState } from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal'


const TimePicker = ({ isVisibleModal, setIsVisibleModal, duration, handleChange }) => {
    const [minutes, setMinutes] = useState((Math.floor((duration % 3600) / 60)))
    const [seconds, setSeconds] = useState(Math.floor(duration % 60))

    const MAX_MINUTES = 60;
    const MAX_SECONDS = 60;
    
    return (
        <Modal
            style={{
                margin: 0,
                backgroundColor: COLORS.white,
                height: '25%',
                flex: 0,
                bottom: 0,
                position: 'absolute',
                width: '100%'
            }}
            isVisible={isVisibleModal}
            onBackdropPress={() => setIsVisibleModal(false)}
            onModalWillHide={() => handleChange(minutes, seconds)}
        >
            <View style={{
                flexDirection: 'row',
                bottom: 0,
                position: 'absolute',
            }}>
                <Picker
                    selectedValue={minutes}
                    style={{
                        flex: 1
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                        setMinutes(itemValue)
                    }>
                    {
                        [...Array(MAX_MINUTES).keys()].map(item => <Picker.Item key={item} label={item.toString()} value={item} />)
                    }
                </Picker>
                <Picker
                    selectedValue={seconds}
                    style={{
                        flex: 1
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                        setSeconds(itemValue)
                    }>
                    {
                        [...Array(MAX_SECONDS).keys()].map(item => <Picker.Item key={item} label={item.toString()} value={item} />)
                    }
                </Picker>
            </View>
        </Modal>
    )
}

export default TimePicker
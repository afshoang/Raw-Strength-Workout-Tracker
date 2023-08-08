import { COLORS } from '../constants';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal'

const ModalPicker = ({ data, isVisibleModal, setIsVisibleModal, selectedValue, handleChange }) => {

  return (
    <Modal
        style={{
            margin: 0,
            backgroundColor: COLORS.white,
            height: 100,
            flex: 0,
            bottom: 0,
            position: 'absolute',
            width: '100%'
        }}
        isVisible={isVisibleModal}
        onBackdropPress={() => setIsVisibleModal(false)}
    >
        <Picker
            style={{
                backgroundColor: COLORS.white,
                bottom: 0,
                position: 'absolute',
                width: '100%'
            }}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => handleChange(itemValue)}
        >
            {
                data.map(item => <Picker.Item key={item.value} label={item.name} value={item.value} />)
            }
        </Picker>
    </Modal>
  )
}

export default ModalPicker
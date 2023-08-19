import { COLORS } from '../constants';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal'
import tw from '../lib/tailwind';

const ModalPicker = ({ data, isVisibleModal, setIsVisibleModal, selectedValue, handleChange }) => {

  return (
    <Modal
        style={tw`w-full m-0 flex-0 bottom-0 h-24 absolute bg-white`}
        isVisible={isVisibleModal}
        onBackdropPress={() => setIsVisibleModal(false)}
    >
        <Picker
            style={tw`w-full bottom-0 absolute bg-white`}
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
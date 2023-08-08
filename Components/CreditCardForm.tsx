import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, Alert } from 'react-native';

interface CreditCardFormProps {
  onSubmit: (data: CreditCardFormData) => void;
}

interface CreditCardFormData {
  name: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmit = () => {
    // Basic validation: Ensure all fields are filled
    if (!name || !cardNumber || !expiration || !cvv) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    // Additional validation logic can be added here if needed
    // For example, validating cardNumber format, expiration date, and cvv

    // Create a data object with the form values
    const formData: CreditCardFormData = {
      name,
      cardNumber,
      expiration,
      cvv,
    };

    // Set loading state to true while submitting
    setIsLoading(true);

    // Simulating an asynchronous API call to submit the form data
    // Replace this with your actual API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Call the onSubmit function with the form data
      onSubmit(formData);
    }, 2000); // Simulating a 2-second delay for demonstration purposes
  };

  return (
    <View>
      {/* Show success message when form is successfully submitted */}
      {isSuccess && <Text style={styles.successText}>Success</Text>}

      <TextInput
        style={styles.TextInput}
        placeholder="Cardholder Name"
        defaultValue={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Card Number"
        defaultValue={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />

      <View style={styles.row}>
        <TextInput
          style={[
            styles.TextInput,
            {
              marginRight: 24,
            },
          ]}
          placeholder="Expiration Date"
          defaultValue={expiration}
          onChangeText={(text) => setExpiration(text)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Security Code"
          defaultValue={cvv}
          onChangeText={(text) => setCvv(text)}
        />
      </View>
      
      {/* Disable the button while loading */}
      <Button title={isLoading ? "Loading..." : "PAY #500.00"} onPress={handleFormSubmit} disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 36,
  },
  TextInput: {
    flex: 1,
    marginTop: 24,
    borderBottomWidth: 1, // Optional: Add a border to the bottom of the text input for better visibility
  },
  successText: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CreditCardForm;

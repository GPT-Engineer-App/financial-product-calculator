import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

const calculatePMT = (rate, nper, pv) => {
  return (rate * pv) / (1 - Math.pow(1 + rate, -nper));
};

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loanAmount, setLoanAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(36);
  const [loanTenure, setLoanTenure] = useState(12);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const weeklyRate = interestRate / 52 / 100;
    const pmt = calculatePMT(weeklyRate, loanTenure, -loanAmount);
    const additionalAmount = (7 * loanAmount * interestRate) / 365 / 100 / loanTenure;
    const total = pmt + additionalAmount;
    setResult(total.toFixed(2));
    onOpen();
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Loan Payment Calculator</Text>
        <Input placeholder="Loan Amount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} type="number" />
        <Input placeholder="Interest Rate (%)" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} type="number" />
        <Input placeholder="Loan Tenure (Weeks)" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} type="number" />
        <Button leftIcon={<FaCalculator />} colorScheme="teal" onClick={handleCalculate}>
          Calculate
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Calculation Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your weekly payment is: ${result}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;

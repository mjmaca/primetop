import styled from 'styled-components';

export const StyledPaymentInfo = styled.div`
  margin-top: 32px;
  border: 1px solid #ddd;
`;

export const PaymentMethod = styled.div`
  padding: 16px;
  padding-bottom: 0px;
  display: flex;
  align-items: center;
  .label {
    font-size: 12px;
    font-weight: 600;
  }
  .MuiFormControlLabel-label {
    font-size: 12px;
    text-transform: capitalize;
  }
  .MuiIconButton-root {
    padding: 4px;
  }
`;

export const PaymentTerms = styled.div`
  padding: 16px;
  padding-bottom: 0px;
  .label {
    font-size: 12px;
    font-weight: 600;
  }
  textarea {
    margin-top: 8px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0px;
`;

export const Comments = styled.div`
  padding: 16px;
  padding-top: 0px;
  .label {
    font-size: 12px;
    font-weight: 600;
  }
  textarea {
    margin-top: 8px;
  }
`;

import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// rendering spinner component if components are in a loading state, once loading is false, it will render the wrappedComponent
const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps}) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    )
    }
    return Spinner
}

export default WithSpinner
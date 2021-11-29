import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    // Stripe wants all prices in cents so $50 = 5000 so we do this calculation to make code readable
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51K0oueHecTnGvU3DV7H9gfzIKCmmTqhMNnANgV2vLcbW8ekseuz4OnvDDmVSxfX56EKO0YwkMMc3HS1bgKBPOO2Q00kAyfy68A'
    const onToken = token => {
        console.log(token)
        alert('Payment successful!')
    }

    return(
        <StripeCheckout
            label='Pay now'
            name='Crwn Clothing AB'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton
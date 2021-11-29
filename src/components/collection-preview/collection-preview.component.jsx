import React from "react";
import { Link } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

import {
    CollectionPreviewContainer,
    CollectionTitle,
    CollectionItemContainer
} from './collection-preview.styles'

const CollectionPreview = ({title, items}) => (
    <CollectionPreviewContainer>
        <Link to={`/shop/${title.toLowerCase()}`}><CollectionTitle>{title.toUpperCase()}</CollectionTitle></Link>
        <CollectionItemContainer>
            {
                items
                // only showing 4 results with the .filter method.
                .filter((item, idx) => idx < 4)
                .map((item) => (
                    <CollectionItem key={item.id} item={item}/>
                ))
            }
        </CollectionItemContainer>
    </CollectionPreviewContainer>
)

export default CollectionPreview
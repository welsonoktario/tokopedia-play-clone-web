import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { Box, Button, Card, Heading, Inset, Link, Text } from '@radix-ui/themes'

import { ProductType } from '@/types'

import styles from './ProductCard.module.css'

type ProductCardPropsType = {
  product: ProductType
}

export const ProductCard = ({ product }: ProductCardPropsType) => {
  return (
    <Card className={styles.productCard}>
      <Inset side="top">
        <img
          src={product.thumbnailUrl}
          className={styles.productCardImg}
          loading="lazy"
        />
      </Inset>
      <Box mt="3" mb="2">
        <Heading size="1" className={styles.productCardTitle}>
          {product.title}
        </Heading>
        <Text as="p" size="3" weight="bold" color="tomato">
          {product.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </Text>
      </Box>
      <Inset side="bottom">
        <Button
          className={styles.productCardLink}
          variant="soft"
          size="3"
          asChild
        >
          <Link
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rt-r-w-100"
          >
            <ExternalLinkIcon fontSize="4" />
            See on Tokopedia
          </Link>
        </Button>
      </Inset>
    </Card>
  )
}

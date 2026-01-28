import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OrderProps {
  fullName: string
  magicLink?: string;
}

export const Order = ({ fullName, magicLink }: OrderProps) => (
  <Html>
    <Head />
    <Preview>Your order has been placed successfully!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={
            "https://res.cloudinary.com/dzntbhciz/image/upload/v1701964131/WhatsApp_Image_2023-09-21_at_2.34.18_PM_rqp7a6.jpg"
          }
          width={100}
          height={100}
          alt="Ayat Fahiem"
        />
        <Heading style={heading}>🪄Ayat Fahiem Store</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              Hi {fullName}, Your order had been placed successfully!
            </Link>
          </Text>
          <Text style={paragraph}>
            Thank you for shopping with us, if you need any further assistance
            contact us on our Instagram page.
          </Text>
          <Section className="py-10">
            <Row>
              <Column>
                <Link href="https://www.instagram.com/ayatfahiemcosmetics/">
                  <Img
                    src={
                      "https://res.cloudinary.com/dzntbhciz/image/upload/v1711310023/krbir1x9s33vazpg35i4.png"
                    }
                    width="36"
                    height="36"
                    className="ml-1"
                  />
                </Link>
              </Column>
            </Row>
          </Section>
        </Section>
        <Text style={paragraph}>
          Order is expected to be delivered within 3-5 business days.
        </Text>
        <Text style={paragraph}>
          Best,
          <br />- Ayat Fahiem Team
        </Text>
        <Hr style={hr} />
        <Img
          src={
            "https://res.cloudinary.com/dzntbhciz/image/upload/v1701964131/WhatsApp_Image_2023-09-21_at_2.34.18_PM_rqp7a6.jpg"
          }
          width={50}
          height={50}
          style={{
            margin: "20px 0",
          }}
        />

        <Text style={footer}>Ayat Fahiem Store.</Text>
        <Text style={footer}></Text>
      </Container>
    </Body>
  </Html>
);

Order.PreviewProps = {
  magicLink: "https://ayatfahiem.com",
} as OrderProps;

export default Order;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#00000",
  fontSize: "12px",
  marginLeft: "4px",
};

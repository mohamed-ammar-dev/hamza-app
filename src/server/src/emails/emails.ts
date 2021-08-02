import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export function forgotPassword(to, domain, token) {
  sgMail.send({
    to,
    from: {
      name: "Hamza App",
      email: "sockrat.love@gmail.com",
    },
    templateId: "d-2c831ef5bdb9417685688953817a90cf",
    dynamicTemplateData: {
      link: `https://${domain}/password/reset?token=${token}`,
      domain: `https://${domain}`,
    },
  });
}

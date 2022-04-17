import { Theme } from "theme-ui"

import base from "./preset-base"
import { reactTabsStyles } from "./react-tabs"

export const getGradient = (rgb: string) => {
  /**
   * Split RGB. Example: rgb(226, 217, 211)
   * Then extract only numbers
   */
  const splitted = rgb.split(",").map((raw) => raw.replace(/\D/g, ""))

  return `linear-gradient(225deg, ${rgb} 0%, rgba(${splitted[0]}, ${splitted[1]}, ${splitted[2]}, 0.7) 50%, rgba(${splitted[0]}, ${splitted[1]}, ${splitted[2]}, 0.5) 100%)`
}

/**
 * rgb(84, 42, 147)
 * rgb(48, 114, 180, .7)
 *
 */

const theme: Theme = {
  ...base,
  colors: {
    background: "#0C0500",
    text: "rgb(226, 217, 211)",
    primary: "#FCA903",
    primaryGradient: getGradient("rgb(4, 4, 3, .7)"),
    heading: "rgb(226, 217, 211)",
    background2: "#FCA903",
    backgroundGradient: getGradient("rgb(4, 4, 3)"),
    // modes: {
    //   light: {
    //     background: "rgb(226, 217, 211)",
    //     text: "rgb(4, 4, 3)",
    //     primary: "rgb(48, 114, 180, .7)",
    //     primaryGradient: getGradient("rgb(48, 114, 180, .7)"),
    //     heading: "#1E1E24",
    //     background2: "#1E1E24",
    //     backgroundGradient: getGradient("rgb(226, 217, 211)")
    //   }
    // }
    error: "#B00020",
    success: "#5cb85c",
  },

  sizes: {
    container: "100rem",
    
  },
  config: {
    useLocalStorage: true,
  },

  fonts: {
    heading:
      'slackey',
  },

  buttons: {
    primary: {
      display: "flex",
      color: "#FCA903",
      background: (theme) => theme.colors?.primaryGradient,
      border: "1px solid #F5b00e",
      transition: "all .125s linear",
      alignItems: "center",
      borderColor: "primary",
      opacity: 1,
      fontWeight: 500,

      "&:not(:disabled):hover": {
        bg: "#FCA903",
        borderColor: "#FCA903",
        cursor: "pointer",
        opacity: 0.5,
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
    secondary: {
      display: "flex",
      color: "#F5b00e",
      background: (theme) => theme.colors?.primaryGradient,
      border: "1px solid #F5b00e",
      transition: "all .125s linear",
      alignItems: "center",
      borderColor: "#F5b00e",
      opacity: 1,
      fontWeight: 500,

      "&:not(:disabled):hover": {
        bg: "background",
        cursor: "pointer",
        opacity: 0.7,
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.3,
      },
    },
    special: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#F5b00e",
      transform: "perspective(1px) translateZ(0)",
      position: "relative",
      background: (theme) => theme.colors?.primaryGradient,
      borderRadius: ".4rem",
      boxShadow: "0 0 5px 2px #00000054",
      fontSize: "1.6rem",
      padding: "1.2rem 3.2rem",
      textTransform: "capitalize",
      fontWeight: 500,
      textAlign: "center",
      transition: "all .125s linear",

      "&:not(:disabled):hover": {
        background: "linear-gradient(225deg, rgb(48, 114, 180, .7), grey)",
        cursor: "pointer",
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.3,
      },
    },
    resetted: {
      display: "flex",
      background: (theme) => theme.colors?.primaryGradient,
      border: "none" /*essential*/,
      padding: "0" /*essential*/,
      font: "inherit" /*important as otherwise the text will look slightly different*/,
      color:
        "#F5b00e" /*if you want the span the same colour as the rest of the sentence*/,
      cursor:
        "pointer" /*make sure you add this, but if you really want it to behave like a span you would leave this out*/,
      transition: "all .125s linear",

      "&:not(:disabled):hover": {
        cursor: "pointer",
        opacity: 0.7,
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.3,
      },
    },
  },

  lineHeights: { body: 1.45 },

  text: {
    heading: {
      color: "heading",
      lineHeight: "body",
      fontSize: "2.2rem",
      fontFamily:
        'slackey',
      fontWeight: 900,
    },
    headingSpecial: {
      color: "heading",
      lineHeight: "body",
      fontSize: "2.2rem",
      fontFamily:
        'slackey',
      fontWeight: 900,
    },
    heading2: {
      color: "heading",
      lineHeight: "body",
      fontSize: "1.9rem",
      fontFamily: 'slackey',
      fontWeight: 600,
    },
    heading3: {
      color: "heading",
      lineHeight: "body",
      fontSize: "1.7rem",
      fontWeight: 600,
      fontFamily: 'slackey',
    },
    heading4: {
      color: "heading",
      lineHeight: "body",
      fontSize: "1.6rem",
      fontWeight: 600,
      fontFamily: 'slackey',
    },
    base: {
      color: "text",
      lineHeight: "body",
      fontSize: "1.4rem",
      fontFamily: 'slackey',
    },
    small: {
      color: "text",
      lineHeight: "body",
      fontSize: "1.2rem",
      fontFamily: 'slackey',
    },
    xsmall: {
      color: "text",
      lineHeight: "body",
      fontSize: "1rem",
      fontFamily: 'slackey',
    },
  },

  styles: {
    ...base.styles,

    root: {
      ...base.styles?.root,
      fontSize: "80%",
      minHeight: "100vh",
      fontFamily: 'slackey',
      "#stakeName": {
        width: "140px",
        background:"rgb(252, 169, 3)",
        borderRadius:"1px",
        color:"white"
      },
      "@media only screen and (max-width: 600px)": {
        "#stakeName": {
          width: "80px",
         
          fontSize:"0.7rem"
        }
      },
      ".css-pmiaez-Box":{
        maxWidth:"200rem",
        padding:"10px"
      },
      body: {
        /** Default text styles */
        fontSize: "1.4rem",
        fontFamily:    'slackey',
        lineHeight: 1.45,
        minHeight: "100vh",
        color: "text",
        backgroundColor: "background",
        // background : 'url("./images/background.jpg")',
        transition: "all .125s linear",
      },

      img: {
        maxWidth: "100%",
        height: "auto",
      },

      p: {
        margin: 0,
        fontFamily: 'slackey',
      },

      a: {
        transition: "all .125s linear",
        color: "text",

        "&:hover": {
          cursor: "pointer",
          color: "#fff",
        },

        "&:-webkit-any-link": {
          color: "heading",
          fontFamily: 'slackey',
          textDecoration: "none",
          transition: "all .125s linear",

          "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
            opacity: 0.8,
          },
        },
      },
      ul: {
        paddingInlineStart: 0,
      },
      ".slick-dots": {
        "li button::before": {
          color: "text",
        },
        "li.slick-active button::before": {
          color: "#F5b00e",
        },
      },

      ...reactTabsStyles,
    },

    spinnerSmall: {
      size: "1.2rem!important",
      color: "#F5b00e"
    },
  },
}

export default theme

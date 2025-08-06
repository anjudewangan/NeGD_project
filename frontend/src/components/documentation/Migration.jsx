import React from 'react';
import PageHeader from 'components/common/PageHeader';
import { Card } from 'react-bootstrap';
import FalconEditor from 'components/common/FalconEditor';
import MigrationSidebar from './MigrationSidebar';

import { Row, Col } from 'react-bootstrap';
import Cta from 'components/pages/landing/Cta';
import Services from 'components/pages/landing/Services';

const removeCode = `npm uninstall react-scripts webpack webpack-cli webpack-fix-style-only-entries`;
const viteConfigCode = `
import { defineConfig, loadEnv } from 'vite';
import fs from 'fs/promises';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import compileSCSS from './compile-scss';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), jsconfigPaths(), compileSCSS()],
    base: process.env.VITE_PUBLIC_URL || '/',
    esbuild: {
      loader: 'jsx',
      include: /src\\/.*\\.jsx?$/,
      exclude: []
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad({ filter: /src\\/.*\\.js$/ }, async args => ({
                loader: 'jsx',
                contents: await fs.readFile(args.path, 'utf8')
              }));
            }
          }
        ]
      }
    },
    define: {
      global: 'window'
    },
    server: {
      open: true,
      port: Number(process.env.VITE_APP_PORT) || 3000,
      host: process.env.VITE_APP_HOST || 'localhost'
    }
  });
};
`;

const compileSCSSCode = `
/* eslint-disable */

import path from 'path';
import fs from 'fs';
import * as sass from 'sass';
import rtlcss from 'rtlcss';

const compileSCSS = () => ({
  name: 'compile-scss',
  configureServer(server) {
    const scssWatcher = server.watcher;
    const scssGlob = path.resolve(__dirname, 'src/assets/scss/**/*.scss');
    scssWatcher.add(scssGlob);

    const scssFiles = [path.resolve(__dirname, 'src/assets/scss/theme.scss')];

    const compileSCSSToCSS = async file => {
      const result = await sass.compileAsync(file, { style: 'expanded' });
      const fileName = path.basename(file, path.extname(file));

      const cssPath = path.resolve(__dirname, \`public/css/\${fileName}.css\`);
      fs.mkdirSync(path.dirname(cssPath), { recursive: true });
      fs.writeFileSync(cssPath, result.css);

      const rtlResult = rtlcss.process(result.css);
      const rtlCssPath = path.resolve(
        __dirname,
        \`public/css/\${fileName}.rtl.css\`
      );
      fs.writeFileSync(rtlCssPath, rtlResult);
    };

    scssWatcher.on('change', file => {
      if (file.endsWith('.scss')) {
        scssFiles.map(file => {
          compileSCSSToCSS(file);
        });
      }
    });

    scssFiles.map(file => {
      compileSCSSToCSS(file);
    });
  },
  handleHotUpdate({ file, server }) {
    server.ws.send({
      type: 'full-reload'
    });
  }
});

export default compileSCSS;
`;

const useToggleStyleCode = `
  import { useEffect, useState } from 'react';
  
  const useToggleStylesheet = (isRTL, isDark) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const publicUrl = import.meta.env.VITE_PUBLIC_URL;
  
    useEffect(() => {
      setIsLoaded(false);
      Array.from(document.getElementsByClassName('theme-stylesheet')).forEach(
        link => link.remove()
      );
      const link = document.createElement('link');
      link.href = \`\${publicUrl}css/theme\${isRTL ? '.rtl' : ''}.css\`;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.className = 'theme-stylesheet';
  
      const userLink = document.createElement('link');
      userLink.href = \`\${publicUrl}css/user\${isRTL ? '.rtl' : ''}.css\`;
      userLink.type = 'text/css';
      userLink.rel = 'stylesheet';
      userLink.className = 'theme-stylesheet';
  
      link.onload = () => {
        setIsLoaded(true);
      };
  
      document.getElementsByTagName('head')[0].appendChild(link);
      document.getElementsByTagName('head')[0].appendChild(userLink);
      document
        .getElementsByTagName('html')[0]
        .setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }, [isRTL]);
  
    useEffect(() => {
      document.documentElement.setAttribute(
        'data-bs-theme',
        isDark ? 'dark' : 'light'
      );
    }, []);
  
    return { isLoaded };
  };
  
  export default useToggleStylesheet;
`;

const jsonScriptCode = `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  }
}`;

const jsonScriptRemoveCode = `{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "build:css": "webpack --config webpack.config.js",
    "watch:css": "webpack --config webpack.config.js --watch"
  }
}`;

const envCode = `
  VITE_ESLINT_NO_DEV_ERRORS
  VITE_PUBLIC_URL
  VITE_SKIP_PREFLIGHT_CHECK
  VITE_REACT_APP_TINYMCE_APIKEY
  VITE_REACT_APP_GOOGLE_API_KEY
`;

const indexHTMLCode = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/src/assets/img/favicons/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2c7be5" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700|Poppins:100,200,300,400,500,600,700,800,900&display=swap"
      />

      <title>NeGD - Call Center Dashboard</title>
    </head>

    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <main class="main" id="main"></main>
      <script type="module" src="/src/index.jsx"></script>
    </body>
  </html>
`;

const renameJsToJsxCode = `
import fs from 'fs';
import path from 'path';

const pathName = [
  'src/components',
  'src/layouts',
  'src/hooks',
  'src/providers',
  'src/widgets',
  'src/App.js',
  'src/index.js'
];

// Main function to rename .js files to .jsx
// This function takes an array of file and folder paths as input
// It renames all .js files to .jsx in the specified paths

function renameJsToJsx(inputs) {
  inputs.forEach(input => {
    const inputPath = path.resolve(input);

    if (!fs.existsSync(inputPath)) {
      console.log(\`Not found: \${inputPath}\`);
      return;
    }

    const stats = fs.statSync(inputPath);

    if (stats.isDirectory()) {
      traverseAndRename(inputPath);
    } else if (stats.isFile() && path.extname(inputPath) === '.js') {
      renameFile(inputPath);
    } else {
      console.log(\`Skipping: \${inputPath} (Not a .js file or folder)\`);
    }
  });
}

// Helper function to traverse directories and rename .js files to .jsx
// This function uses recursion to go through all subdirectories
// and rename any .js files it finds

function traverseAndRename(currentPath) {
  const items = fs.readdirSync(currentPath);

  items.forEach(item => {
    const itemPath = path.join(currentPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      traverseAndRename(itemPath);
    } else if (stats.isFile() && path.extname(itemPath) === '.js') {
      renameFile(itemPath);
    }
  });
}

// Helper function to rename a single .js file to .jsx

function renameFile(filePath) {
  const newFilePath = path.join(
    path.dirname(filePath),
    path.basename(filePath, '.js') + '.jsx'
  );
  fs.renameSync(filePath, newFilePath);
  console.log(\`Renamed: \${filePath} → \${newFilePath}\`);
}

// File and folder paths to rename
// You can add more paths to this array as needed
// Note: The paths should be relative to the current working directory
renameJsToJsx(pathName);

`;

const viteInstallCode = `
npm install vite vite-jsconfig-paths @vitejs/plugin-react --save-dev
npm install rtlcss
`;

const paths = `
const paths = [
  'src/components',
  'src/layouts',
  'src/hooks',
  'src/providers',
  'src/widgets',
  'src/App.js',
  'src/index.js'
];`;
const Migration = () => (
  <Row className="g-3">
    <Col xs={12} lg={12} xl={12} className="order-lg-1">
      <Cta />
    </Col>
    <Col xs={3} lg={3} xl={3} className="order-lg-1">
      <MigrationSidebar />
    </Col>
    <Col xs={9} lg={9} xl={9} className="order-lg-1">
      <Services />
    </Col>
    {/* <Col xs={12} lg={8} xl={9}>
      <PageHeader
        title="Migration Guide from v4.7.0 to v4.8.0"
        description="This guide will help you migrate Falcon React from Create React App (CRA) to Vite."
        className="mb-3"
      />

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="pre-requisites">
            Prerequisites
          </h5>
          <p>Before you begin, ensure you have the following installed :</p>
          <ul>
            <li>
              <code>Node.js (v16 or later)</code>
            </li>
            <li>
              <code>npm (v6 or later)</code>
            </li>
          </ul>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="remove-dependencies">
            Step 1: Remove CRA and webpack dependencies
          </h5>
          <p>
            Remove the existing CRA setup and Webpack dependencies. Run the
            following command:
          </p>
          <FalconEditor code={removeCode} language="bash" hidePreview />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="remove-webpack">
            Step 2: Remove <code>webpack.config.js</code>
          </h5>
          <p>
            Remove the <code>webpack.config.js</code> from the root
          </p>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="install-vite">
            Step 3: Install Vite and related dependencies
          </h5>
          <p>
            Install Vite and its related dependencies, along with the
            compile-scss dependencies, to compile SCSS into CSS by running the
            following command:
          </p>
          <FalconEditor code={viteInstallCode} language="bash" hidePreview />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="edit-scripts">
            Step 4: Edit scripts on <code>package.json</code>
          </h5>
          <p>
            Now add the following scripts in the <code>package.json</code> file:
          </p>
          <FalconEditor code={jsonScriptCode} language="json" hidePreview />
          <p>
            Remove this scripts from the <code>package.json</code> file
          </p>
          <FalconEditor
            code={jsonScriptRemoveCode}
            language="json"
            hidePreview
          />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="update-env">
            Step 5: Update The <code>.env</code> file
          </h5>
          <p>
            Now rename the existing <code>.env</code> variables.
          </p>
          <FalconEditor code={envCode} language="env" hidePreview />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="configure-vite-config">
            Step 6: Configure <code>vite.config.js</code>
          </h5>
          <p>
            Next, configure the <code>vite.config.js</code> file located at the
            root of your project. This file serves as Vite's main configuration
            file and includes settings for plugins, the development server, and
            the build process. Below is a sample configuration:
          </p>
          <FalconEditor code={viteConfigCode} language="js" hidePreview />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="add-compile-scss">
            Step 7: Add <code>compile-scss</code> file
          </h5>
          <p>
            Now create a file named <code>compile-scss.js</code> at the root of
            your project. This file is responsible for compiling SCSS files into
            CSS. Below is a sample code snippet for the{' '}
            <code>compile-scss.js</code> file:
          </p>
          <FalconEditor code={compileSCSSCode} language="js" hidePreview />
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="renaming-js-files">
            Step 8: Renaming <code>.js</code> files to <code>.jsx</code>
          </h5>
          <p>
            To align with React and Vite best practices (especially for JSX
            syntax support), we are migrating all relevant <code>.js</code>{' '}
            files containing JSX code to <code>.jsx</code> extension. Follow the
            steps below to rename the files:
          </p>
          <ul>
            <li className="mb-3">
              <h5 id="add-rename-script">Add the Rename script</h5>
              <p>
                We have created a script <code>renameJsToJsx.js</code> that
                automatically renames <code>.js</code> files to{' '}
                <code>.jsx</code>
                for the provided folder path.
              </p>
              <FalconEditor
                code={renameJsToJsxCode}
                language="jsx"
                hidePreview
              />
            </li>
            <li className="mb-3">
              <h5 id="configure-rename-paths">Configure the Rename paths</h5>
              <p>
                Inside the <code>renameJsToJsx.js</code> file, you can specify
                which folders or files you want to process. Example inside
                renameJsToJsx.js. Modify the paths array according to the
                folders you want to target.
              </p>
              <FalconEditor code={paths} language="js" hidePreview />
            </li>
            <li className="mb-3">
              <h5 id="run-rename-script">Run the Rename script</h5>
              <p>
                To rename all the <code>.js</code> file that contains{' '}
                <code>.jsx</code> run the below code, This will automatically
                detect all the <code>.js</code> file rename them to{' '}
                <code>.jsx</code> preserve the folder structure.
              </p>
              <FalconEditor
                code={`node renameJsToJsx.js`}
                language="bash"
                hidePreview
              />
            </li>
            <li className="mb-3">
              <h5 id="reinstall-dependencies">Reinstall Node Modules</h5>
              <p>
                After renaming, delete <code>node_modules</code> and reinstall
                dependencies to ensure Vite picks up the new file extensions
                properly.
              </p>
              <FalconEditor
                code={`node renameJsToJsx.js`}
                language="bash"
                hidePreview
              />
            </li>
            <li>
              <h5 className="text-warning" id="important-notes">
                Important Notes:
              </h5>
              <ul>
                <li>
                  <p className="mb-1">Why this change?</p>
                  <p>
                    Vite and modern tooling treat <code>.js</code> and{' '}
                    <code>.jsx</code> files differently for HMR (Hot Module
                    Reloading) and parsing. JSX code inside <code>.js</code> may
                    cause unexpected reloads or errors. Using <code>.jsx</code>{' '}
                    allows the tooling to properly process React code without
                    full-page reloads.
                  </p>
                </li>
                <li>
                  <p className="mb-1">
                    Id a file does not contain JSX, It can remain{' '}
                    <code>.js</code>
                  </p>
                  <p>
                    This renaming script only changes files that are supposed to
                    have JSX.
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="update-index-html">
            Step 9: Update <code>index.html</code> file
          </h5>
          <p>
            Next move the <code>index.html</code> file from the{' '}
            <code>public</code> to the root of your project. This file is used
            to serve the application. Below is a sample <code>index.html</code>{' '}
            file:
          </p>
          <FalconEditor code={indexHTMLCode} language="html" hidePreview />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="edit-useToggleStyle">
            Step 10: Edit <code>useToggleStyle</code> file
          </h5>
          <p>
            Now, edit the <code>useToggleStyle.jsx</code> file located in the{' '}
            <code>src/hooks</code> folder. This file is used to toggle the
            application's style. Below is a sample of the{' '}
            <code>useToggleStyle.jsx</code> file:
          </p>
          <FalconEditor code={useToggleStyleCode} language="js" hidePreview />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="update-environment">
            Step 11: Update environment variables
          </h5>
          <p>
            Next, migrate the environment variables from{' '}
            <code>process.env</code> to<code>import.meta.env</code> in the
            following components:
          </p>
          <ul>
            <li>
              <code>src/routes/index.jsx</code>
            </li>
            <li>
              <code>src/hooks/useToggleStyle.jsx</code>
            </li>
            <li>
              <code>src/components/common/TinymceEditor.jsx</code>
            </li>
            <li>
              <code>src/components/map/GoogleMap.jsx</code>
            </li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="update-bootstrap-import">
            Step 12: Update the Bootstrap Imports
          </h5>
          <p>
            Now, Update the Bootstrap imports in your SCSS files. Replace the
            following import statement:
          </p>
          <ul>
            <li>
              Replace all the <code>@import '~bootstrap/...'</code> prefix to{' '}
              <code>@import '../../../node_modules/bootstrap/...';</code> in{' '}
              <code>src/assets/scss/_bootstrap.scss</code>
            </li>
            <li>
              Replace all the <code>@import '~bootstrap/...'</code> prefix to{' '}
              <code>@import '../../../node_modules/bootstrap/...';</code> in{' '}
              <code>src/assets/scss/theme.scss</code>
            </li>
            <li>
              Replace all the <code>@import '~bootstrap/...'</code> prefix to{' '}
              <code>@import '../../../node_modules/bootstrap/...';</code> in{' '}
              <code>src/assets/scss/user.scss</code>
            </li>
          </ul>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="update-css-imports">
            Step 13: Update the css imports
          </h5>
          <p>Now update the css imports in the corresponding files:</p>
          <ul>
            <li>
              <code>import 'simplebar-react/dist/simplebar.min.css'</code> in{' '}
              <code>src/App.jsx</code>
            </li>
            <li>
              <code>import 'leaflet/dist/leaflet.css'</code> in{' '}
              <code>
                src/components/dashboards/project-management/project-location/ProjectLocation.jsx
              </code>
            </li>
          </ul>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-3" id="run-application">
            Step 14: Run the application
          </h5>
          <p>
            Now run the following command to run the application. It will the
            code in the <code>localhost:3000</code>
          </p>
          <FalconEditor code="npm run dev" language="bash" hidePreview />
        </Card.Body>
      </Card>
    </Col> */}
  </Row>
);
export default Migration;

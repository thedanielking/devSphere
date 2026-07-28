import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"; 

function PostContent({content}) {

    const markdownComponents = {
      code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");
    
          return !inline && match ? (
            <div className="my-6 w-full max-w-full overflow-hidden rounded-xl shadow-sm border border-stone-200 bg-[#fafafa]">
              <div className="bg-stone-50 px-4 py-1.5 border-b border-stone-200 flex justify-between items-center select-none">
                <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                  {match[1]}
                </span>
              </div>
              
              {/* Explicit layout constraint wrapper */}
              <div className="w-full overflow-x-auto block dynamic-scroll">
                <SyntaxHighlighter
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "transparent",
                    fontSize: "0.875rem",
                    lineHeight: "1.5rem",
                    whiteSpace: "pre", // Forces long lines onto a horizontal scroll path instead of breaking shapes
                    wordSpacing: "normal",
                    wordBreak: "normal",
                  }}
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : (
            /* Inline code styling fallback like `const x = 5` */
            <code 
                className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-red-600 text-sm font-semibold border border-stone-200 break-words" 
              {...props}
            >
              {children}
            </code>
          );
        }
      };


    return (
      // 5. Added max-w-full and overflow-x-hidden on the main container to protect mobile screens from shifting sideways
      <div className="w-full max-w-full overflow-x-hidden text-stone-800 text-sm/8 text-left lg:text-base/10 leading-relaxed
                    [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-stone-900
                    [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-stone-900
                    [&_h3]:text-base  [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-stone-900
                    [&_p]:mb-4 [&_p]:leading-8
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
                    [&_strong]:font-bold [&_strong]:text-stone-950
                    [&_em]:italic"
                    >
            <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        </div>
    )
}

export default PostContent;

//://////////////////////////////////////////////////////////://

//:HN4: Heroku_Node(lean):04
//:     HN1: Minimal example to serve Html + Javascript.
//:     HN2: Serve File as text, promises, routing refactor.
//:     HN3: SQL execution from file on server.
//:     HN4: CRUD operations demonstration

//:FUNCTION_INDEX:

    //: HN1_Mai                 : MAIn_entry_point
    //: HN1_Ser_Fil             : Serve_File

    //: HN2_Get_fas             : Get_file_as_string
    //: HN2_Rou                 : Main url router function.
    //: HN2_SQL_Get_Tes         : SQL_Get_Test

    //: HN3_Run_cof             : Run_contents_of_file
    //: HN3_Run_fas             : Run_file_as_string

    //: HN4_Pri_rar_daw_cof_ros : Prints[ rar_daw_cof_ros ]
    //: HN4_SQL_Run_C           : Run CREATE sql code.
    //: HN4_SQL_Run_D           : Run DELETE sql code.
    //: HN4_SQL_Run_R           : Run READ   sql code.
    //: HN4_SQL_Run_U           : Run UPDATE sql code.

//:IMPORTS:

    const  D_U = process.env.DATABASE_URL ;          
    const  POR = process.env.PORT || 5190 ;
    const http = require('http');
    const   fs = require('fs'  );
    const   pg = require('pg'  );
    const  URL = require('url' );//:Differentiate_From_url_var
  
//:FILE_SCOPE_CONSTANTS:

    //:VIT:Variable_Integer_Tags:
    const SOB_VIT=( 1 );

//:FILE_SCOPE_VARIABLES:

    var     cli = null; //:pg.Client instance.
    var obj_cin = null; //:pg connection information object

//://////////////////////////////////////////////////////////://

const HN5_NEW_sob=function( /** void **/ ){
    const HN5_sob={
        vit : SOB_VIT //: Variable_Integer_Tag

    ,   req : null //: \__ rar[0|1]
    ,   res : null //: /

    ,   url : null //: \__ rap[0|1]
    ,   pam : null //: /
    
    ,   dat : null //: \__ daw[0|1]
    ,   wha : null //: /

    ,   act : null //: --- act:Action(Function)

    ,   cof : null //: \__ cof_ros[0|1]
    ,   ros : null //: /

    ,   err : null //: --- err:Error.Typically_First_Error

    };;Object.seal( HN5_sob     );
    return( HN5_sob /** sob **/ );
};;

const HN5_err_CTO_str =function( err ){

    str = "";
    if(typeof( err ) == "string" ){
        str = err;
    }else
    if( null == err ){

        str = "[NULL_ERR]";

    }else
    if(typeof( err ) == "object" ){

        if( err.vit == SOB_VIT ){
            str = "[SOB_PASSED_AS_ERROR_OBJECT]";
        }else
        if( 
            //:err.hasOwnProperty("toString") 
            err.toString != Object.prototype.toString
        ){

            //:Iterating through "Object.entries" can give
            //:you a lot of confusing information if the
            //:object is some type of error object that
            //:was designed to be converted into a string
            //:with this method.
            str = err.toString();

        }else{

            //:///////////////////////////////////SC[JSODELO]://
            var any_obj =( err ) ;
            var arr_ent = [] ; //:TopLevelKeyValuePairsNoProto
            var str_cur = "" ; //:Current_String_Being_Built
            var str_all = "" ; //:String_Of_Evertyhing
            var key_val = [] ; //:Current [key,val]
            var     key =null; //:Current_Key
            var     val =null; //:Current_Value

            arr_ent=( Object.entries( any_obj ) );
            
            for(           key_val of arr_ent ){
                key     =( key_val[0] );
                val     =( key_val[1] );
                str_cur =( `${key}:${val}` );
                str_all =( str_all + "\n" + str_cur );
            };;
            //:///////////////////////////////////SC[JSODELO]://

            str=( str_all );
        };;
    };;

    return( str );
};;

const HN5_End_001 =function( sob ){
    if( sob.vit != SOB_VIT ){ throw("[SOB_VIT:001]"); };
    sob.res.end( );

};;
const HN5_End_002 =function( sob , str ){
    if( sob.vit != SOB_VIT ){ throw("[SOB_VIT:002]"); };
    sob.res.end( str );

};;
const HN5_End_003 =function( sob , cof , enc ){
    if( sob.vit != SOB_VIT ){ throw("[SOB_VIT:003]"); };
    sob.res.end( cof, "utf-8" );

};;
const HN5_Wri_002 =function( sob, str ){
    if( sob.vit != SOB_VIT ){ throw("[SOB_VIT:004]"); };
    sob.res.write( str );

};;

const HN5_Wri_Hea_200 =function( sob , cto ){
    if( sob.vit != SOB_VIT ){ throw("[SOB_VIT:005]"); };

    //:cto: content_type_object
    sob.res.writeHead(200, cto);

};;

const HN2_Get_fas =function( src_pat ){

    const hn2_executor=( njs_resolver , njs_rejector )=>{

        fs.readFile( src_pat,function(obj_err, cof ){
            if( obj_err ){

                console.log(
                    "[DEBUG:HN2_Get_fas:REJECT:src_pat]:"
                +                              src_pat );;

            //:     njs_rejector( obj_err );
                    njs_rejector( ""
                    +   "[HN2_Get_fas:Failed_To_Read_File]"
                    +   "[src_pat]:(((" + src_pat + ")))"
                    );;

            }else{

                console.log(
                    "[DEBUG:HN2_Get_fas:RESOLVE:cof]:"
                +                               cof );;

                njs_resolver( cof );

            };;
        });;
    };;

    var pro=( new Promise( hn2_executor ) );
    return( pro );
};;

const HN3_Run_cof
=async function( sob ){ "use strict"

    if( !sob     ){throw("[HN3_E06.A]"); };
    if( !sob.req ){throw("[HN3_E06.B]"); };
    if( !sob.res ){throw("[HN3_E06.C]"); };
    if( !sob.cof ){throw("[HN3_E05]"  ); };

    var cli=null;
    var err="[HN3_E01:NOT_SET]";
    var ros=null; 
    var pas=( 0 );
    try{

        cli = new pg.Client( obj_cin );

        await cli.connect();
        await cli.query("BEGIN" );
        ros =await( cli.query( "" + sob.cof + "" ) );
        await cli.query("COMMIT");
        
        sob.ros=( ros );
        pas=( 0+1 );

    }catch( inn_err ){

        err=( ""
        +   "[HN3_Run_cof.cof](((" + sob.cof + ")))"
        +   "[HN3_E01]:" + HN5_err_CTO_str( inn_err )
        );;
        sob.err=( sob.err + err );

        pas=( 0-1 );

    }finally{

        //:Do_NOT_await_here__Will_hang_server.
        cli.end(); 

    };;

    if( pas > 0 ){   return( sob /** resolver **/ ); }   
    return(  Promise.reject( err /** rejector **/ )  );;  
};;

const HN3_Run_fas 
=function( sob ){ "use strict"


    const hn3_executor=( njs_resolver , njs_rejector )=>{

        var ror_boo =( 0 ); //:1:Resolve, 2:Reject
        var src_pat =( sob.dat );
        if( (!src_pat)||(!sob.dat)){ 
            throw("[HN5_NO_SOB_DAT]");
        }else{
            console.log("[DEBUG:src_pat]:", src_pat );
        };;

        HN2_Get_fas( src_pat )
       .then(( cof )=>{

            ror_boo=( 0-2 );
            sob.cof=( cof );
            
            //:RETURN ANOTHE PROMISE, DO NOT   //:///////////://
            //:BREAK THE PROMISE CHAIN!        //:///////////://    
            return( //://////////////////////////////////////://
                    
            
                HN3_Run_cof( sob )
                .then(( ros )=>{
            
                    //:Successful execution of query
                    sob.ros=( ros );
                    ror_boo=(  1  );
            
                }).catch((err)=>{
            
                    ror_boo=(  2  );
                    sob.err=( sob.err + err ); 
                    HN5_Wri_002( 
                        sob
                    ,       (    ""
                            +    "(" 
                            +    "[HN3_E03]:"
                            +    HN5_err_CTO_str( err )
                            +    ")"
                            )
                    );;
            
                })
            );; //://////////////////////////////////////////://

        }).catch(( err_obj )=>{

            ror_boo=(    2    );
            sob.err=( sob.err + err_obj ); //:#FEO#://
            HN5_Wri_002( 
            /**/    sob
            ,      "[HN3_E02]:"+ HN5_err_CTO_str( err_obj )
            );;

        }).finally(()=>{

            if( 1 == ror_boo ){
                njs_resolver( sob ); //:[cof,ros]
            }else
            if( 2 == ror_boo ){
                njs_rejector( sob ); //:(obj_err)
            }else{
                //:This section should never execute.
                //:Indicates a programmer logic error.
                sob.err =( sob.err+
                    ( "[[HN3_E04]:ror_boo]:"+ror_boo )
                );;
                njs_rejector( sob )
            };;

        });;
     
    };; //:[hn3_executor]////////////////////////////////////://

    var pro=( new Promise( hn3_executor ) );
    return( pro );
};;

const HN2_SQL_Get_Tes =function( sob ){ "use strict"

    HN3_Run_fas( sob )
    .then(( cof_ros )=>{

        sob.cof = cof_ros[ 0 ]; //:Contents_Of_File
        sob.ros = cof_ros[ 1 ]; //:Query____Results

        HN5_Wri_002(sob, "[HN3_S01]");

    }).catch((obj_err)=>{

        HN5_Wri_002( sob
        ,       ""
                + "(" 
                + "[HN2_E01]:" 
                + HN5_err_CTO_str( obj_err ) 
                + ")"
        );;

    }).finally(()=>{

        HN5_End_001( sob );

    });;
};;

const HN1_Ser_Fil =function( sob ){ "use strict"

    var pof=( sob.dat ); //:pof[ path_of_file (fil_pat) ]
    
    fs.readFile( pof,function(obj_err, cof ){

        if(obj_err){

            HN5_End_002( sob, "[not_nil:obj_err]");

        }else{

            var mit=( sob.wha ); //:MimeType
            HN5_Wri_Hea_200(sob, { "Content-Type": mit } );
            HN5_End_003( sob, cof , "utf-8" );

        };;
    });;
};;

const HN4_Pri_rar_daw_cof_ros=function(
              rar_daw_cof_ros
){ "use strict"

    //:Unpack Data:
    //://////////////////////////////////////////////////////://
    var rar_daw = rar_daw_cof_ros[ 0 ];
    var cof_ros = rar_daw_cof_ros[ 1 ];

    var rar = rar_daw[ 0 ];
    var daw = rar_daw[ 1 ];

    var cof = cof_ros[ 0 ];
    var ros = cof_ros[ 1 ];
    //://////////////////////////////////////////////////////://

    if( ros.rows  && (ros.rows.length > 0 ) ){

        var len = ros.rows.length;
        for( var i = 0; i < len; i++ ){
            
            var obj_ent=( Object.entries( ros.rows[ i ] ) );

            for( const [key,val] of obj_ent ){
        
                rar[1].write(`${key}:${val}`);
                rar[1].write("\n");
        
            };;
            rar[1].write("\n\n");
        
        };;
    }else
    if( ros.rows && (ros.rows.length <= 0 ) ){

        rar[1].write("[ROWS_OBJECT_IS_EMPTY_ARRAY]\n");

    }else
    if(!ros.rows ){
        
        rar[1].write("[ROWS_OBJECT_DOES_NOT_EXIST]\n");

    }else{
        
        rar[1].write("[EDCL:2020_07_14]");

    };;

    rar[1].write( ""
    +   "[cof](((" + "\n"
    +     cof      + "\n"
    +   ")))"      + "\n"
    );;

};;

//:C:Crud:Crud_Operations_That_Can_Be_Invoked_From_Route:----://
//:CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC://

    const HN4_SQL_Run_C=function( rar_daw ){ "use strict"

        //: rar daw = raw_daw[0|1]
        var rar     = rar_daw[ 0 ];
        var     daw = rar_daw[ 1 ];

        HN3_Run_fas( rar, daw[0] /* src_pat */ )
        .then(( cof_ros )=>{

            HN4_Pri_rar_daw_cof_ros(
                   [rar_daw,cof_ros]
            );;

        }).catch((obj_err)=>{

            rar[1].write( 
                "(" + "[HN4_ERR:HN4_E01]:" 
                + HN5_err_CTO_str( obj_err ) + ")"
            );;

        }).finally(()=>{

            rar[1].end();

        });;
    };;
    const HN4_SQL_Run_R=function( 
        rar_daw 
    ){ "use strict"

        //: rar daw = raw_daw[0|1]
        var rar     = rar_daw[ 0 ];
        var     daw = rar_daw[ 1 ];

        HN3_Run_fas( rar, daw[0] /* src_pat */ )
        .then(( cof_ros )=>{

            HN4_Pri_rar_daw_cof_ros(
                   [rar_daw,cof_ros]
            );;

        }).catch((obj_err)=>{

            rar[1].write( 
                "(" + "[HN4_ERR:HN4_E02]:" 
                + HN5_err_CTO_str( obj_err ) + ")"
            );;

        }).finally(()=>{

            rar[1].end();

        });;
    };;
    const HN4_SQL_Run_U=function( rar_daw ){ "use strict"

        //: rar daw = raw_daw[0|1]
        var rar     = rar_daw[ 0 ];
        var     daw = rar_daw[ 1 ];

        HN3_Run_fas( rar, daw[0] /* src_pat */ )
        .then(( cof_ros )=>{

            HN4_Pri_rar_daw_cof_ros(
                   [rar_daw,cof_ros]
            );;

        }).catch((obj_err)=>{

            rar[1].write( 
                "(" + "[HN4_ERR:HN4_E03]:" 
                + HN5_err_CTO_str( obj_err ) + ")"
            );;

        }).finally(()=>{

            rar[1].end();

        });;
    };;
    const HN4_SQL_Run_D=function( rar_daw ){ "use strict"
        //: rar daw = raw_daw[0|1]
        var rar     = rar_daw[ 0 ];
        var     daw = rar_daw[ 1 ];

        HN3_Run_fas( rar, daw[0] /* src_pat */ )
        .then(( cof_ros )=>{

            HN4_Pri_rar_daw_cof_ros(
                   [rar_daw,cof_ros]
            );;

        }).catch((obj_err)=>{

            rar[1].write( 
                "(" + "[HN4_ERR:HN4_E04]:" 
                + HN5_err_CTO_str( obj_err ) + ")"
            );;

        }).finally(()=>{

            rar[1].end();

        });;

    };;

//:CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC://

//://////////////////////////////////////////////////////////://
//:                                                          ://
//: main request routing function.                           ://
//:                                                          ://
//: Routes can be thought of shortcuts that are associated   ://
//: with a piece of data and an action, in a triplet.        ://
//:                                                          ://
//:     ROUTE           : The URL requested by client        ://
//:     DATA            : Data associated with route         ://
//:     ACTION|WHATEVER : What to do with the DATA           ://
//:                                                          ://
//: Because the last entry of the triplet is an              ://
//: "ACTION | WHATEVER" we need to resolve the               ://
//: "ACTION | WHATEVER" string to an ACTION function         ://
//: to perform using the DATA associated with ROUTE.         ://
//:                                                          ://
//:__________________________________________________________://
const HN2_Rou=function( req , res ){ "use strict"

    //:Declare_And_Summarize_All_Function_Variables:
    var sob     = HN5_NEW_sob(); //:sob:State_Object
    var tab_daw = null      ; //:TABle_of:Data_and_Whatever
    var tab_act = null      ; //:TABle_of:ACTion(s)
    var     daw = null      ; //:selected:Data_and_Whatever 
             
    tab_daw={  
        "/K" : [ "./server.js", "text/plain"      ]
    ,   "/H" : [ "./htm._"    , "text/html"       ]
    ,   "/J" : [ "./j_s._"    , "text/javascript" ]
    ,   "/T" : [ "./sql._"    , "SQL_GET_TEST"    ]
    
    ,   "/C"      :[ "./SQL/C._"  , "SQL_RUN_C"   ]
    ,   "/CRUD_C" :[ "./SQL/C._"  , "SQL_RUN_C"   ]
                                                
    ,   "/R"      :[ "./SQL/R._"  , "SQL_RUN_R"   ]
    ,   "/CRUD_R" :[ "./SQL/R._"  , "SQL_RUN_R"   ]
                                                
    ,   "/U"      :[ "./SQL/U._"  , "SQL_RUN_U"   ]
    ,   "/CRUD_U" :[ "./SQL/U._"  , "SQL_RUN_U"   ]
                                                
    ,   "/D"      :[ "./SQL/D._"  , "SQL_RUN_D"   ]
    ,   "/CRUD_D" :[ "./SQL/D._"  , "SQL_RUN_D"   ]
    
    };;
    tab_act={ 
        "text/plain"      : HN1_Ser_Fil
    ,   "text/html"       : HN1_Ser_Fil
    ,   "text/javascript" : HN1_Ser_Fil
    ,   "SQL_GET_TEST"    : HN2_SQL_Get_Tes
    
    ,   "SQL_RUN_C"       : HN4_SQL_Run_C
    ,   "SQL_RUN_R"       : HN4_SQL_Run_R
    ,   "SQL_RUN_U"       : HN4_SQL_Run_U
    ,   "SQL_RUN_D"       : HN4_SQL_Run_D
    };;

    //:rar:Request_And_Response:
    sob.req =( req     ); //:rar[ 0 ]
    sob.res =( res     ); //:rar[ 1 ]
    
    //:rap:Relativeurl_And_Parameters_of_query
    sob.url =(          req.url              ); //:rap[ 0 ]
    sob.pam =URL.parse( req.url , true ).query; //:rap[ 1 ]
    
    //: daw: Data_And_Whatever
        daw=( tab_daw[ sob.url ] || tab_daw[ "/K" ] );
    sob.dat=( daw[ 0 ] );
    sob.wha=( daw[ 1 ] );

    //: act: Action to take function.
    sob.act=( tab_act[ sob.wha ] );

    //:Call action function:
    sob.act( sob );

};;

const HN1_Mai=function(){ "use strict"

    obj_cin={
        /**/connectionString:D_U
        ,   ssl:{rejectUnauthorized:false}
    };;

    http.createServer( HN2_Rou ).listen(POR);

};;
HN1_Mai();

/**-*********************************************************-**
                                                    
                 ": Double quote character. Same as single:'
                 ': Single quote character. Same as double:"
                 +: [ addition | string concat | english:And ]
                 ,: Seperates elements of array or object.
                 .: English period or dot operator.
                 /: Forward slash, url or file path seperator
                 0: Array access of first element
                 1: Array access of second element
                 :: Colon character, used for {key:value}
                 ;: End a single-line statement
                 =: Assign 
                (): Operator precedence or function invokation.
                //: comment character
                /T: Test url path
                01: First project in Heroku_Node project series
                ;;: End a multi-line  statement
                ==: Equality Comparison
                []: Array literal or array access.
                fs: file_system, built-in Node.js package.
                if: Denotes condition required to execute block
                pg: Postgres library for Node.js
                to: Participle or denoting conversion.
                {}: [ object / dictionary ] literal.
               //:: My personal colored comment sequence
               200: HTTP Status Code: Okay.
               ===: Strict Equality Comparison
               D_U: Database_Url
               HN1: Heroku_Node_01 (Project Namespace)
               HN2: HerokuNode(lean)02 ( Namespace )
               HN3: HerokuNode(lean)03 ( Namespace )
               HN4: HerokuNode(lean)04 ( Namespace )
               POR: Shorthand. SEE[ PORT ]
               UTF: Unicode Transformation Format (ASCI++)
               act: Action to perform
               cli: Client object. Probably PostGres PG client.
               cof: ContentsOf_ile (file_path ==> file_contents)
               dar: Database Response. USE[ ros ] instead.
               daw: DataAndWhatever
               end: Server is done talking to client.
               env: contains virtual machine's environment vars
               err: An error string. MAYBE error object.
               new: New keyword instantiates instances
               pac: Path And Contenttype
               pas: Did whatever pass boolean as integer.
               pgc: PostGres_Client, just use [ cli ]
               pro: Promise instance
               rar: rar[0]==req, rar[1]==res
               req: REQuest  object
               res: RESponse object (TYPE:ServerResponse)
               ros: Result_Of_SQL (AKA: dar but use ros)
               src: Denote path to javascript source file
               ssl: Secure_Sockets_Layer (But probably:TLS)
               tls: Transport_Layer_Security (Updated ssl)
               try: Attempt a block of guarded code.
               url: Uniform_Resource_Locator
               var: function scope variable
              "/C": SHORT path: Create  ( DEMONSTRATION )
              "/D": SHORT path: Delete  ( DEMONSTRATION )
              "/H": Routes to our HTML file.
              "/J": Routes to our JavaScript file.
              "/K": Routes to our "key._" file.
              "/R": SHORT path: Read    ( DEMONSTRATION )
              "/U": SHORT path: Update  ( DEMONSTRATION )
              5190: Default Port Number if PORT undefined
              CRUD: Create_Read_Update_Delete
              DATA: Information to act on or transform somehow
              EDCL: Expected_Dead_Code_Line
              HTML: Hyper Text Markup Language
              Html: A stupid way to write "HTML"
              PORT: PORT number server application listens on
              PORT: defined if deployed on Heroku or Azure
              else: Denotes alternative block of code.
              func: NOT a keyword. Function pointer variable.
              http: http package that comes with Node.js
              http: hyper_text_transer_protocol
              null: A pointer to nothing. 
              rows: Rows returned from sql query
              then: Do this if promise accepted
              true: Boolean value for [  set/on ] bit.
             "SQL": Structured_Query_Language (Folder)
             ROUTE: Relative url identifying page or resource
             alert: Display an alert box
             await: Pause execution here until async returns.
             catch: Do this if promise rejected or error.
             const: immutable block-scope variable
             false: Boolean value for [unset/off] bit.
             query: Run an SQL query on database.
             serve: To deliver data from server to client
             sql._: A test SQL file to help figure things out.
             throw: Throw an error
             title: Node representing <title> element.
             write: Writes in body of response to client.
            <head>: Metadata container element.
            ACTION: A function to be performed with DATA
            length: Number of elements in an array
            listen: Creates listener on specified port.
            return: Return keyword returns value from function.
            script: Declare script reference in HTML file.
            window: Represents an open window in a browser.
           "BEGIN": Groups SQL statements into a transaction.
           "utf-8": Unicode byte encoding. Extends: US-ASCII
           <title>: Denote title of html page
           DOCTYPE: Tell browser what markup language is used.
           HN1_Mai: MAIn_entry_point
           HN1_Mai: Main entry point.
           HN2_Rou: HerokuNode2_Router (Main routing function)
           HN3_E01: HerokuNode(lean)03: Error #1
           HN3_E02: HerokuNode(lean)03: Error #2
           HN3_E03: HerokuNode(lean)03: Error #3
           HN3_E04: HerokuNode(lean)03: Error #4
           HN3_E05: HerokuNode(lean)03: Error #5
           HN3_E06: HerokuNode(lean)03: Error #6
           HN3_S01: HerokuNode(lean)03: Success #1
           HN4_E01: HerokuNode4_Error #1
           HN4_E02: HerokuNode4_Error #2
           HN4_E03: HerokuNode4_Error #3
           HN4_E04: HerokuNode4_Error #4
           HN4_ERR: HerokuNode04_ERRor
           IMPORTS: A list of imports at top of file.
           Minimal: No extranious moving parts.
           Promise: Promise class built into NodeJS
           charset: Denote character encoding of file. 
           connect: Connect to database.
           dat_fil: DEPRECATED_USE[ cof ](cof:ContentsOfFile)
           example: Show you how it is done
           finally: Always do this part of try/catch block.
           jum_dic: JUMp_DICtionary (Like a jumptable)
           not_nil: Denote object is not [nil/null]
           obj_cin: OBJect_ConnectionINformation
           obj_err: Object of duck-type error.
           process: built-in Node.js global [variable/object]
           rar_daw: [ raw , daw ] packed together.
           raw_daw: [ raw , daw ] packed into tuple.
           require: Like: Java import, C# using , C include
           ror_boo: ResolveOrReject_BOOlean
           ror_dat: ResolveOrReject_DATa
           src_pat: SouRCe_PATh (Path to source text)
           tab_act: TABle_of_ACTions
           tab_daw: TABle_of_DataAndWhatever
          "COMMIT": Commit changes made by SQL transation.
          WHATEVER: Interpret it as data,function or whatever.
          document: Root node of the HTML document.
          function: Denotes a function/procedure/method.
          function: Used for functions assigned to const
          readFile: Async file load
          toString: Convert object to string representation.
         "./htm._": Html file with "_" extension
         "./j_s._": Javascript file with "_" extension
         "./key._": File documenting 100% of source tokens.
         "/CRUD_C": LONG  path: Create  ( DEMONSTRATION )
         "/CRUD_D": LONG  path: Delete  ( DEMONSTRATION )
         "/CRUD_R": LONG  path: Read    ( DEMONSTRATION )
         "/CRUD_U": LONG  path: Update  ( DEMONSTRATION )
         setHeader: Sets single header value for headers object.
         writeHead: Sends a response header to the request
        FILE_SCOPE_VARIABLES :: File scope in the C99 sense.
        JavaScript: The language used by Node.js servers
        Javascript: Poorly capitalized "JavaScript"
       "SQL_RUN_C": Tells us a CREATE function should be ran.
       "SQL_RUN_D": Tells us a DELETE function should be ran.
       "SQL_RUN_R": Tells us a READ   function should be ran.
       "SQL_RUN_U": Tells us a UPDATE function should be ran.
       "text/html": "Content-Type" for html files
       HN1_Ser_Fil: HN1_Serve_File: Serves a file to client.
       HN1_Ser_Fil: Serve_File
       HN2_Get_fas: Get FileAsString(fas)
       HN2_Get_fas: Get_file_as_string
       HN3_Run_cof: Run_contents_of_file
       HN3_Run_fas: Run_file_as_string
       Heroku_Node: Denotes a project using Heroku & Node.js
      "text/plain": "Content-Type" for plain text, NOT code.
      "use strict": Warnings are errors.
      DATABASE_URL: Database URL built into heroku machines.
      createServer: SEE[ https://nodejs.org/api/http.html ]
      hn2_executor: Executor function from HN2 project.
      hn3_executor: Private executor func with HN3 namespace.
      njs_rejector: Rejector function built into NodeJS
      njs_resolver: Resolver function built into NodeJS
     Default__Path: Default path if browser url is invalid
     HN4_Pri_rar_daw_cof_ros :: Prints rar_daw_cof_ros
     HN4_SQL_Run_C: Action to run CREATE sql command.
     HN4_SQL_Run_D: Action to run DELETE sql command.
     HN4_SQL_Run_R: Action to run READ   sql command.
     HN4_SQL_Run_U: Action to run UPDATE sql command.
     Selected_Path: Path selected in browser url
    "Content-Type": Key denoting the MIME type of payload.
    "SQL_GET_TEST": Action to perform is SQL GET TEST.
    "WINDOW_ALERT": Placeholder string.
    FUNCTION_INDEX: A list of function names at top of file
   " Content-Type": Header indicating media type of resource.
   <!DOCTYPE HTML>: Tell browser document type is HTML.
   HN2_SQL_Get_Tes: Get SQL file as string test.
   HN2_SQL_Get_Tes: SQL_Get_Test
   rar_daw_cof_ros: [rar_daw,cof_ros] packed into tuple.
  "DOCUMENT_TITLE": Placeholder string.
  connectionString: Provider uses this to connect to database.
 "EDCL:2020_07_14": EDCL error as unique string
 "text/javascript": "Content-Type" for javascript files
"ROWS_OBJECT_DOES_NOT_EXIST" :: Helpful info for example code.
"ROWS_OBJECT_IS_EMPTY_ARRAY" :: Helpful info for example code.
const A=(B)=>{...}: function "A" taking param "B"
rejectUnauthorized: Worry about verifying server identity?

**-*********************************************************-**/
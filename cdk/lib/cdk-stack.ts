import * as cdk from 'aws-cdk-lib';
import {aws_certificatemanager, aws_route53, aws_route53_targets, aws_ssm, RemovalPolicy} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {BlockPublicAccess, Bucket} from "aws-cdk-lib/aws-s3";
import {S3Origin} from "aws-cdk-lib/aws-cloudfront-origins";
import {Distribution, ViewerProtocolPolicy} from "aws-cdk-lib/aws-cloudfront";
import {BucketDeployment, Source} from "aws-cdk-lib/aws-s3-deployment";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hostingBucket = new Bucket(this, 'FrontendBucket', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      bucketName: 'tasks-benkhard-nl-react-bucket'
    });

    const certificateArn = aws_ssm.StringParameter.valueForStringParameter(this, '/com/benkhard/wildcard-certificate-cloudfront')

    const certificate = aws_certificatemanager.Certificate.fromCertificateArn(this, 'Certificate', certificateArn)

    const hostedZoneId = aws_ssm.StringParameter.valueForStringParameter(this, '/com/benkhard/public-hosted-zone-id');
    const zone = aws_route53.HostedZone.fromHostedZoneAttributes(this, 'Zone', {
      hostedZoneId: hostedZoneId,
      zoneName: 'benkhard.com'
    })

    const distribution = new Distribution(this, 'CloudfrontDistribution', {
      defaultBehavior: {
        origin: new S3Origin(hostingBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [
        'tasks.benkhard.com'
      ],
      certificate,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    new BucketDeployment(this, 'BucketDeployment', {
      sources: [Source.asset("../build")],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    new aws_route53.ARecord(this, "SiteRecord", {
      recordName: 'tasks.benkhard.com',
      target: aws_route53.RecordTarget.fromAlias(new aws_route53_targets.CloudFrontTarget(distribution)),
      zone
    });
  }
}
